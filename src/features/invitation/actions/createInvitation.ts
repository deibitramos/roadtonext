'use server';

import { revalidatePath } from 'next/cache';
import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';
import { getErrorMessage } from '@/lib/error';
import inngest from '@/lib/inngest';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';
import createInvitationSchema, {
	type CreateInvitationData,
} from '../schemas/createInvitationSchema';
import generateInvitationLink from '../utils/generateInvitationLink';

const createInvitation = async (organizationId: string, data: CreateInvitationData) => {
	const user = await getAdminOrRedirect(organizationId);

	try {
		const { email } = createInvitationSchema.parse(data);

		const targetMembership = await prisma.membership.findFirst({
			where: { organizationId, user: { email } },
		});

		if (targetMembership) {
			return actionError('User is already a member of this organization');
		}

		const invitationLink = await generateInvitationLink(user.id, organizationId, email);
		await inngest.send({
			name: 'app/invitation.send',
			data: { userId: user.id, organizationId, email, invitationLink },
		});
	} catch (error) {
		const message = getErrorMessage(error, 'Failed to create invitation');
		return actionError(message);
	}

	revalidatePath(`/organization/${organizationId}/invitations`);
	return actionSuccess('User invited to organization');
};

export default createInvitation;
