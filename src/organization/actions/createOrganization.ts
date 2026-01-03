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
	const user = await getSessionUserOrRedirect({ skipOrganizationCheck: true });

	try {
		const data = createOrganizationSchema.parse({
			name: formData.get('name'),
		});

		await prisma.organization.create({
			data: { ...data, memberships: { create: { userId: user.id } } },
		});
	} catch (error) {
		return fromErrorToActionState(error);
	}

	await setCookie('toast', 'Organization created');
	redirect('/tickets');
};

export default createOrganization;
