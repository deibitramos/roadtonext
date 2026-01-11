'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import createOrganizationSchema, {
	type CreateOrganizationData,
} from '@/features/organization/schemas/createOrganizationSchema';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { actionError } from '@/lib/types';

const createOrganization = async (data: CreateOrganizationData) => {
	const user = await getSessionUserOrRedirect({ skipHasOrgCheck: true, skipActiveOrgCheck: true });

	const result = createOrganizationSchema.safeParse(data);
	if (!result.success) {
		return actionError(result.error.issues[0]?.message || 'Invalid data');
	}

	try {
		await prisma.$transaction(async (tx) => {
			const organization = await tx.organization.create({
				data: {
					...result.data,
					memberships: {
						create: { userId: user.id, isActive: true, role: 'ADMIN' },
					},
				},
			});

			await tx.membership.updateMany({
				where: { userId: user.id, organizationId: { not: organization.id } },
				data: { isActive: false },
			});
		});

		revalidatePath('/organization');
	} catch (error) {
		return actionError(error instanceof Error ? error.message : 'Failed to create organization');
	}
	await setCookie('toast', 'Organization created');
	redirect('/organization');
};

export default createOrganization;
