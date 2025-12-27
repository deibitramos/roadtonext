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
	return { ...ticket, owner: isOwner(user, ticket) };
};

export type TicketWithUser = NonNullable<Awaited<ReturnType<typeof getTicket>>>;

export default getTicket;
