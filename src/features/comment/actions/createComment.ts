'use server';

import { revalidatePath } from 'next/cache';
import * as service from '@/features/attachments/service';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { getErrorMessage } from '@/lib/error';
import { actionError, actionSuccess } from '@/lib/types';
import * as db from '../data';
import { type CreateCommentData, getCommentSchema } from '../schemas/createCommentSchema';

const createComment = async (ticketId: string, data: CreateCommentData) => {
	const user = await getSessionUserOrRedirect();

	const schema = getCommentSchema(false);
	const result = schema.safeParse(data);
	if (!result.success) {
		return actionError(result.error.issues[0]?.message || 'Invalid data');
	}

	const { content, files } = result.data;

	try {
		const comment = await db.createComment({
			userId: user.id,
			ticketId,
			content,
			options: { includeUser: true, includeTicket: true },
		});

		await service.createAttachments({
			subject: comment,
			entity: 'COMMENT',
			entityId: comment.id,
			files,
		});

		revalidatePath(`/tickets/${ticketId}`);
		return actionSuccess(comment);
	} catch (error) {
		const message = getErrorMessage(error, 'Failed to create comment');
		return actionError(message);
	}
};

export default createComment;
