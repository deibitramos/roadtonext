'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import { toActionState } from '@/components/form/utils/toActionState';
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUser } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const deleteTicket = async (id: string) => {
	const user = await getSessionUser();
	const ticket = await prisma.ticket.findUnique({ where: { id } });
	if (!ticket || !isOwner(user, ticket)) return toActionState('Not authorized', 'ERROR');

	await prisma.ticket.delete({ where: { id } });
	revalidatePath('/tickets');

	await setCookie('toast', 'Ticket deleted');
	redirect('/tickets');
};

export default deleteTicket;
