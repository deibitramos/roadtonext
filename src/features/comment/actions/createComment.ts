'use server';

import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { z } from 'zod';
import {
	type ActionState,
	fromErrorToActionState,
	toActionState,
} from '@/components/form/utils/toActionState';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import type { CommentWithUser } from '../queries/getComments';

const createCommentSchema = z.object({
	content: z.string().min(1).max(1024),
});

const createComment = async (
	ticketId: string,
	_actionState: ActionState<CommentWithUser>,
	formData: FormData,
): Promise<ActionState<CommentWithUser>> => {
	const user = await getSessionUserOrRedirect();

	let comment: CommentWithUser;

	try {
		const data = createCommentSchema.parse(Object.fromEntries(formData));
		const dbComment = await prisma.comment.create({
			data: { userId: user.id, ticketId: ticketId, ...data },
			include: { user: true },
		});
		comment = { ...dbComment, owner: true };
	} catch (error) {
		return fromErrorToActionState(error);
	}

	revalidatePath(`/tickets/${ticketId}`);

	return toActionState('Comment created successfully', 'SUCCESS', comment);
};

export default createComment;
