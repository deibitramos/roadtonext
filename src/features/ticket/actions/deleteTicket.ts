'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const deleteTicket = async (ticketId: string) => {
	await prisma.ticket.delete({
		where: { id: ticketId },
	});
	revalidatePath('/tickets');
	redirect('/tickets');
};

export default deleteTicket;
