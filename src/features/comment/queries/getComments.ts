import prisma from '@/lib/prisma';

const getComments = (ticketId: string) => {
	return prisma.comment.findMany({
		where: { ticketId },
		include: { user: { select: { name: true } } },
		orderBy: { createdAt: 'asc' },
	});
};

export type CommentWithUser = Awaited<ReturnType<typeof getComments>>[number];

export default getComments;
