'use server';

import { revalidatePath } from 'next/cache';
import { setCookie } from '@/actions/cookies';
import { toActionState } from '@/components/form/utils/toActionState';
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const deleteComment = async (id: string) => {
	const user = await getSessionUserOrRedirect();
	const comment = await prisma.comment.findUnique({ where: { id } });
	if (!comment || !isOwner(user, comment)) return toActionState('Not authorized', 'ERROR');

	const { ticketId } = comment;
	await prisma.comment.delete({ where: { id } });
	revalidatePath(`/tickets/${ticketId}`);

	await setCookie('toast', 'Comment deleted');

	return toActionState('Comment deleted successfully');
};

export default deleteComment;
