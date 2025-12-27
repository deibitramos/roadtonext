'use server';

import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUserOrUndefined } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const getComments = async (ticketId: string, cursor?: number) => {
	const user = await getSessionUserOrUndefined();
	const where = { ticketId, createdAt: cursor ? { lt: new Date(cursor) } : undefined };
	const take = 2;

	let [comments, count] = await Promise.all([
		prisma.comment.findMany({
			where,
			take: take + 1,
			include: { user: { select: { name: true } } },
			orderBy: { createdAt: 'desc' },
		}),
		prisma.comment.count({ where }),
	]);

	const hasNextPage = comments.length > take;
	comments = hasNextPage ? comments.slice(0, -1) : comments;

	return {
		list: comments.map((comment) => ({
			...comment,
			owner: user ? isOwner(user, comment) : false,
		})),
		metadata: { count, hasNextPage, cursor: comments.at(-1)?.createdAt.valueOf() },
	};
};

export type CommentWithUser = Awaited<ReturnType<typeof getComments>>['list'][number];

export default getComments;
