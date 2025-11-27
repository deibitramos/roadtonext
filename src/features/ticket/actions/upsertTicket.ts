'use server';

import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { redirect } from 'next/navigation';
import { z } from 'zod/v4';
import { setCookie } from '@/actions/cookies';
import {
	type ActionState,
	fromErrorToActionState,
	toActionState,
} from '@/components/form/utils/toActionState';
import prisma from '@/lib/prisma';

const upsertTicketSchema = z.object({
	title: z.string().min(1).max(191),
	content: z.string().min(1).max(1024),
});

const upsertTicket = async (
	id: string | undefined,
	_actionState: ActionState,
	formData: FormData,
) => {
	try {
		const data = upsertTicketSchema.parse({
			title: formData.get('title'),
			content: formData.get('content'),
		});

		await prisma.ticket.upsert({ where: { id: id || '' }, update: data, create: data });
	} catch (error) {
		return fromErrorToActionState(error, formData);
	}

	revalidatePath('/tickets');
	if (id) {
		await setCookie('toast', 'Ticket updated');
		redirect(`/tickets/${id}`);
	}

	return toActionState('Ticket created');
};

export default upsertTicket;
