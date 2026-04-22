'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import createOrganizationSchema, {
	type CreateOrganizationData,
} from '@/features/organization/schemas/createOrganizationSchema';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { getErrorMessage } from '@/lib/error';
import inngest, { organizationCreatedEvent } from '@/lib/inngest';
import prisma from '@/lib/prisma';
import { actionError } from '@/lib/types';

const createOrganization = async (data: CreateOrganizationData) => {
	const user = await getSessionUserOrRedirect({ skipHasOrgCheck: true, skipActiveOrgCheck: true });

	const result = createOrganizationSchema.safeParse(data);
	if (!result.success) {
		return actionError(result.error.issues[0]?.message || 'Invalid data');
	}

	try {
		const organization = await prisma.$transaction(async (tx) => {
			const org = await tx.organization.create({
				data: {
					...result.data,
					memberships: {
						create: { userId: user.id, isActive: true, role: 'ADMIN' },
					},
				},
			});

			await tx.membership.updateMany({
				where: { userId: user.id, organizationId: { not: org.id } },
				data: { isActive: false },
			});

			return org;
		});

		await inngest.send(
			organizationCreatedEvent.create({
				organizationId: organization.id,
				byEmail: user.email,
			}),
		);

		revalidatePath('/organization');
	} catch (error) {
		const message = getErrorMessage(error, 'Failed to create organization');
		return actionError(message);
	}
	await setCookie('toast', 'Organization created');
	redirect('/organization');
};

export default createOrganization;
