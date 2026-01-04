'use server';

import { revalidatePath } from 'next/cache';
import { fromErrorToActionState, toActionState } from '@/components/form/utils/toActionState';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const switchOrganization = async (organizationId: string) => {
	const user = await getSessionUserOrRedirect({ skipActiveOrganizationCheck: true });

	try {
		const membership = await prisma.membership.findFirst({
			where: { organizationId, userId: user.id },
		});
		if (!membership) return toActionState('Not a member of this organization', 'ERROR');

		await prisma.$transaction([
			prisma.membership.updateMany({
				where: { userId: user.id, organizationId: { not: organizationId } },
				data: { isActive: false },
			}),
			prisma.membership.update({
				where: { userId_organizationId: { userId: user.id, organizationId } },
				data: { isActive: true },
			}),
		]);
	} catch (error) {
		return fromErrorToActionState(error);
	}

	revalidatePath('/organization');
	return toActionState('Active organization has been switched');
};

export default switchOrganization;
