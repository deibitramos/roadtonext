'use server';

import { revalidatePath } from 'next/cache';
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { getErrorMessage } from '@/lib/error';
import inngest from '@/lib/inngest';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';
import { isTicket } from '../types';

const deleteAttachment = async (id: string) => {
	const user = await getSessionUserOrRedirect();
	const attachment = await prisma.attachment.findUniqueOrThrow({
		where: { id },
		include: {
			ticket: true,
			comment: {
				include: { ticket: true },
			},
		},
	});

	const subject = attachment.ticket ?? attachment.comment;
	if (!subject) {
		return actionError('Subject not found');
	}

	if (!isOwner(user, subject)) {
		return actionError('Not authorized');
	}

	try {
		await prisma.attachment.delete({ where: { id } });
		const organizationId = isTicket(subject)
			? subject.organizationId
			: subject.ticket.organizationId;

		const dataForEvent = {
			attachmentId: id,
			organizationId,
			entity: attachment.entity,
			entityId: subject.id,
			fileName: attachment.name,
		};
		await inngest.send({ name: 'app/attachment.delete', data: dataForEvent });
	} catch (error) {
		return actionError(getErrorMessage(error));
	}

	const ticketId = isTicket(subject) ? subject.id : subject.ticket.id;
	revalidatePath(`/tickets/${ticketId}`);
	return actionSuccess();
};

export default deleteAttachment;
