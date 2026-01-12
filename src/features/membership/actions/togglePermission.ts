'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';
import getAdminOrRedirect from '../queries/getAdminOrRedirect';

type PermissionKey = 'canDeleteTicket';

const togglePermission = async (
	userId: string,
	organizationId: string,
	permission: PermissionKey,
) => {
	await getAdminOrRedirect(organizationId);

	const where = { userId_organizationId: { userId, organizationId } };

	const membership = await prisma.membership.findUnique({ where });
	if (!membership) return actionError('Membership not found');

	await prisma.membership.update({ where, data: { [permission]: !membership[permission] } });
	revalidatePath(`/organization/${organizationId}/memberships`);
	return actionSuccess();
};

export default togglePermission;
