'use server';

import { revalidatePath } from 'next/cache';
import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';

const deleteInvitation = async (email: string, organizationId: string) => {
	await getAdminOrRedirect(organizationId);

	const invitation = await prisma.invitation.findUnique({
		where: { email_organizationId: { email, organizationId } },
	});

	if (!invitation) {
		return actionError('Invitation not found');
	}

	await prisma.invitation.delete({ where: { email_organizationId: { email, organizationId } } });

	revalidatePath(`/organization/${invitation.organizationId}/invitations`);
	return actionSuccess();
};

export default deleteInvitation;
