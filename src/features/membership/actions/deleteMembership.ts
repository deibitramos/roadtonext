'use server';

import { revalidatePath } from 'next/cache';
import { fromErrorToActionState, toActionState } from '@/components/form/utils/toActionState';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const deleteMembership = async (userId: string, organizationId: string) => {
	await getSessionUserOrRedirect();

	try {
		const memberships = await prisma.membership.findMany({ where: { organizationId } });
		if (memberships.length <= 1) {
			return toActionState('Cannot delete the last membership of the organization', 'ERROR');
		}

		await prisma.membership.delete({
			where: { userId_organizationId: { userId, organizationId } },
		});
	} catch (error) {
		return fromErrorToActionState(error);
	}

	revalidatePath(`/organization/${organizationId}/memberships`);
	return toActionState('Membership has been deleted');
};

export default deleteMembership;
