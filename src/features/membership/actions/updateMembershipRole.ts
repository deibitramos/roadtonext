'use server';

import { revalidatePath } from 'next/cache';
import type { MembershipRole } from '@/generated/prisma/client';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';
import getMemberships from '../queries/getMemberships';

const updateMembershipRole = async (
	userId: string,
	organizationId: string,
	role: MembershipRole,
) => {
	await getSessionUserOrRedirect();
	const memberships = await getMemberships(organizationId);

	const targetMembership = memberships.find((membership) => membership.userId === userId);
	if (!targetMembership) return actionError('Membership not found');

	if (targetMembership.role === 'ADMIN') {
		const adminCount = memberships.filter((membership) => membership.role === 'ADMIN').length;
		if (adminCount <= 1) return actionError('You cannot delete the last admin of an organization');
	}

	await prisma.membership.update({
		where: { userId_organizationId: { userId, organizationId } },
		data: { role },
	});

	revalidatePath(`/organization/${organizationId}/memberships`);
	return actionSuccess();
};

export default updateMembershipRole;
