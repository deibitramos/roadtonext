'use server';

import { revalidatePath } from 'next/cache';
import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';

const deleteInvitation = async (id: string) => {
	const invitation = await prisma.invitation.findUnique({ where: { id } });
	if (!invitation) {
		return actionError('Invitation not found');
	}

	await getAdminOrRedirect(invitation.organizationId);
	await prisma.invitation.delete({ where: { id } });

	revalidatePath(`/organization/${invitation.organizationId}/invitations`);
	return actionSuccess();
};

export default deleteInvitation;
