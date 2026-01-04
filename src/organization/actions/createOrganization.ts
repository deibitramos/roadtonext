'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookie } from '@/actions/cookies';
import { type ActionState, fromErrorToActionState } from '@/components/form/utils/toActionState';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const createOrganizationSchema = z.object({
	name: z.string().min(1).max(191),
});

const createOrganization = async (_actionState: ActionState, formData: FormData) => {
	const user = await getSessionUserOrRedirect({
		skipOrganizationCheck: true,
		skipActiveOrganizationCheck: true,
	});

	try {
		const data = createOrganizationSchema.parse({
			name: formData.get('name'),
		});

		await prisma.$transaction(async (tx) => {
			const organization = await tx.organization.create({
				data: { ...data, memberships: { create: { userId: user.id, isActive: true } } },
			});

			await tx.membership.updateMany({
				where: { userId: user.id, organizationId: { not: organization.id } },
				data: { isActive: false },
			});
		});
	} catch (error) {
		return fromErrorToActionState(error);
	}

	await setCookie('toast', 'Organization created');
	redirect('/organization');
};

export default createOrganization;
