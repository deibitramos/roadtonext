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
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { toCent } from '@/lib/currency';
import prisma from '@/lib/prisma';

const upsertTicketSchema = z.object({
	title: z.string().min(1).max(191),
	content: z.string().min(1).max(1024),
	deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, expected YYYY-MM-DD'),
	bounty: z.coerce.number().positive(),
});

const upsertTicket = async (
	id: string | undefined,
	_actionState: ActionState,
	formData: FormData,
) => {
	const user = await getSessionUserOrRedirect();
	if (!user.activeMembershipId) return toActionState('Not authorized', 'ERROR');

	try {
		if (id) {
			const ticket = await prisma.ticket.findUnique({ where: { id } });
			if (!ticket || !isOwner(user, ticket)) return toActionState('Not authorized', 'ERROR');
		}

		const data = upsertTicketSchema.parse({
			title: formData.get('title'),
			content: formData.get('content'),
			deadline: formData.get('deadline'),
			bounty: formData.get('bounty'),
		});

		const dbData = {
			...data,
			userId: user.id,
			bounty: toCent(data.bounty),
		};

		await prisma.ticket.upsert({
			where: { id: id || '' },
			update: dbData,
			create: { ...dbData, organizationId: user.activeMembershipId },
		});
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
