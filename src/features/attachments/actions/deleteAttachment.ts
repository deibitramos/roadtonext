'use server';

import { revalidatePath } from 'next/cache';
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { getErrorMessage } from '@/lib/error';
import inngest from '@/lib/inngest';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';

const deleteAttachment = async (id: string) => {
	const user = await getSessionUserOrRedirect();
	const attachment = await prisma.attachment.findUniqueOrThrow({
		where: { id },
		include: { ticket: true },
	});

	if (!isOwner(user, attachment.ticket)) {
		return actionError('Not authorized');
	}

	try {
		await prisma.attachment.delete({ where: { id } });

		const dataForEvent = {
			attachmentId: id,
			organizationId: attachment.ticket.organizationId,
			ticketId: attachment.ticketId,
			fileName: attachment.name,
		};
		await inngest.send({ name: 'app/attachment.delete', data: dataForEvent });
	} catch (error) {
		return actionError(getErrorMessage(error));
	}

	revalidatePath(`/tickets/${attachment.ticketId}`);
	return actionSuccess();
};

export default deleteAttachment;
