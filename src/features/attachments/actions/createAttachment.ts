'use server';

import { revalidatePath } from 'next/cache';
import isOwner from '@/features/auth/utils/isOwner';
import type { AttachmentEntity } from '@/generated/prisma/client';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { getErrorMessage } from '@/lib/error';
import { actionError, actionSuccess } from '@/lib/types';
import { type CreateAttachmentData, getServerFilesSchema } from '../schemas/createAttachmentSchema';
import * as service from '../service';
import { isTicket } from '../types';

const createAttachment = async (
	entity: AttachmentEntity,
	entityId: string,
	data: CreateAttachmentData,
) => {
	const user = await getSessionUserOrRedirect();

	const subject = await service.getAttachmentSubject(entity, entityId);
	if (!subject) return actionError('Subject not found');

	if (!isOwner(user, subject)) {
		return actionError('Not the owner of this subject');
	}

	try {
		const schema = getServerFilesSchema(true);
		const { files } = schema.parse(data);
		await service.createAttachments({ subject, entity, entityId, files });

		const ticketId = isTicket(subject) ? entityId : subject.ticket.id;
		revalidatePath(`/tickets/${ticketId}`);
		return actionSuccess();
	} catch (error) {
		return actionError(getErrorMessage(error, 'Failed to create attachment(s)'));
	}
};

export default createAttachment;
