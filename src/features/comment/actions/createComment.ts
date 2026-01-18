'use server';

import { revalidatePath } from 'next/cache';
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { getErrorMessage } from '@/lib/error';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';
import type { CommentWithUser } from '../queries/getComments';
import createCommentSchema, { type CreateCommentData } from '../schemas/createCommentSchema';

const createComment = async (ticketId: string, data: CreateCommentData) => {
	const user = await getSessionUserOrRedirect();

	const result = createCommentSchema.safeParse(data);
	if (!result.success) {
		return actionError(result.error.issues[0]?.message || 'Invalid data');
	}

	try {
		const dbComment = await prisma.comment.create({
			data: { userId: user.id, ticketId, ...result.data },
			include: {
				user: { select: { name: true } },
				attachments: true,
			},
		});

		const comment: CommentWithUser = {
			...dbComment,
			owner: isOwner(user, dbComment),
		};

		revalidatePath(`/tickets/${ticketId}`);
		return actionSuccess(comment);
	} catch (error) {
		const message = getErrorMessage(error, 'Failed to create comment');
		return actionError(message);
	}
};

export default createComment;
