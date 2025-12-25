'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import { toActionState } from '@/components/form/utils/toActionState';
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUser } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const deleteComment = async (id: string) => {
	const user = await getSessionUser();
	const comment = await prisma.comment.findUnique({ where: { id } });
	if (!comment || !isOwner(user, comment)) return toActionState('Not authorized', 'ERROR');

	const { ticketId } = comment;
	await prisma.comment.delete({ where: { id } });
	revalidatePath(`/tickets/${ticketId}`);

	await setCookie('toast', 'Comment deleted');
	redirect(`/tickets/${ticketId}`);

	return toActionState('Comment deleted successfully');
};

export default deleteComment;
