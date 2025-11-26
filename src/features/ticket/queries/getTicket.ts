import prisma from '@/lib/prisma';

const getTicket = async (id: string) => {
	const ticket = await prisma.ticket.findUnique({ where: { id } });
	return ticket;
};

export default getTicket;
