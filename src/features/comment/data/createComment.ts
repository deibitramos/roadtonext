import type { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

const userSelect = { name: true } as const;
const ticketSelect = { id: true, organizationId: true } as const;

type IncludeUserType = { user: { select: typeof userSelect } };
type IncludeTicketType = { ticket: { select: typeof ticketSelect } };
type Options = { includeUser?: boolean; includeTicket?: boolean };

type BuildInclude<O extends Options> = (O['includeUser'] extends true ? IncludeUserType : object) &
	(O['includeTicket'] extends true ? IncludeTicketType : object);

type CommentResult<O extends Options> = Prisma.CommentGetPayload<{ include: BuildInclude<O> }>;
type Args<O extends Options> = { userId: string; ticketId: string; content: string; options?: O };

export const createComment = async <O extends Options>(args: Args<O>) => {
	const { userId, ticketId, content, options } = args;
	const includeUser = options?.includeUser && { user: { select: userSelect } };
	const includeTicket = options?.includeTicket && { ticket: { select: ticketSelect } };

	const comment = await prisma.comment.create({
		data: { userId, ticketId, content },
		include: { ...includeUser, ...includeTicket },
	});
	return comment as CommentResult<O>;
};
