'use server';

import { revalidatePath } from 'next/cache';
import { fromErrorToActionState, toActionState } from '@/components/form/utils/toActionState';
import type { TicketStatus } from '@/generated/prisma/enums';
import prisma from '@/lib/prisma';

const updateTicketStatus = async (ticketId: string, status: TicketStatus) => {
	try {
		await prisma.ticket.update({
			where: { id: ticketId },
			data: { status },
		});
	} catch (error) {
		return fromErrorToActionState(error);
	}
	revalidatePath('/tickets');
	return toActionState('Status updated');
};

export default updateTicketStatus;
