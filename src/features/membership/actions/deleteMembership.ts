'use server';

import { revalidatePath } from 'next/cache';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';

const deleteMembership = async (userId: string, organizationId: string) => {
	const user = await getSessionUserOrRedirect();

	try {
		const memberships = await prisma.membership.findMany({ where: { organizationId } });
		if (memberships.length <= 1) {
			return actionError('Cannot delete the last membership of the organization');
		}

		const userMembership = memberships.find((m) => m.userId === userId);
		if (!userMembership) return actionError('User is not a member of this organization');

		if (
			userMembership.role === 'ADMIN' &&
			memberships.filter((m) => m.role === 'ADMIN').length <= 1
		) {
			return actionError('Cannot delete the last admin of the organization');
		}

		if (user.id !== userId) {
			const sessionUserIsAdmin = memberships.some(
				(m) => m.userId === user.id && m.role === 'ADMIN',
			);
			if (!sessionUserIsAdmin)
				return actionError('You can only delete other user memberships as an admin');
		}

		await prisma.membership.delete({
			where: { userId_organizationId: { userId, organizationId } },
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : 'An unknown error occurred';
		return actionError(message);
	}

	revalidatePath(`/organization/${organizationId}/memberships`);
	return actionSuccess();
};

export default deleteMembership;
