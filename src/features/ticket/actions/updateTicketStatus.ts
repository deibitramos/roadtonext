'use server';

import { revalidatePath } from 'next/cache';
import { fromErrorToActionState, toActionState } from '@/components/form/utils/toActionState';
import isOwner from '@/features/auth/utils/isOwner';
import type { TicketStatus } from '@/generated/prisma/enums';
import { getSessionUser } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const updateTicketStatus = async (id: string, status: TicketStatus) => {
	const user = await getSessionUser();
	try {
		const ticket = await prisma.ticket.findUnique({ where: { id } });
		if (!ticket || !isOwner(user, ticket)) return toActionState('Not authorized', 'ERROR');

		await prisma.ticket.update({
			where: { id },
			data: { status },
		});
	} catch (error) {
		return fromErrorToActionState(error);
	}
	revalidatePath('/tickets');
	return toActionState('Status updated');
};

export default updateTicketStatus;
