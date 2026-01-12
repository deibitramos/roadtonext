import prisma from '@/lib/prisma';

type Params = {
	userId: string;
	organizationId: string;
};

const getTicketPermissions = async (params: Params) => {
	const { userId, organizationId } = params;
	if (!userId || !organizationId) return { canDeleteTicket: false };

	const membership = await prisma.membership.findUnique({
		where: { userId_organizationId: { userId, organizationId } },
	});

	return {
		canDeleteTicket: membership?.canDeleteTicket ?? false,
	};
};

export default getTicketPermissions;
