import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUserOrUndefined } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const getTicket = async (id: string) => {
	const user = await getSessionUserOrUndefined();

	const ticket = await prisma.ticket.findUnique({
		where: { id },
		include: { user: { select: { name: true } } },
	});
	if (!ticket) return null;

	const owner = isOwner(user, ticket);
	const { organizations = [] } = user ?? {};
	const ticketOrganization = organizations.find((o) => o.id === ticket.organizationId);
	const { canDeleteTicket = false } = ticketOrganization || {};

	return { ...ticket, owner, permissions: { canDeleteTicket: owner && canDeleteTicket } };
};

export type TicketWithUser = NonNullable<Awaited<ReturnType<typeof getTicket>>>;

export default getTicket;
