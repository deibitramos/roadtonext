import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';
import prisma from '@/lib/prisma';

export const getInvitations = async (organizationId: string) => {
	await getAdminOrRedirect(organizationId);

	return await prisma.invitation.findMany({
		where: { organizationId },
		select: {
			id: true,
			email: true,
			createdAt: true,
			invitedByUser: { select: { email: true, name: true } },
		},
	});
};

export default getInvitations;
