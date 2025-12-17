import prisma from '@/lib/prisma';

const getTicket = async (id: string) => {
	const ticket = await prisma.ticket.findUnique({
		where: { id },
		include: { user: { select: { name: true } } },
	});
	return ticket;
};

export type TicketWithUser = NonNullable<Awaited<ReturnType<typeof getTicket>>>;

export default getTicket;
