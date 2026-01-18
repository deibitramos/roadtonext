'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import isOwner from '@/features/auth/utils/isOwner';
import { AttachmentEntity } from '@/generated/prisma/client';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { s3 } from '@/lib/aws';
import { getErrorMessage } from '@/lib/error';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';
import {
	type CreateAttachmentData,
	createAttachmentServerSchema,
} from '../schemas/createAttachmentSchema';
import { isTicket } from '../types';
import generateS3Key from '../utils/generateS3Key';

const createAttachment = async (
	entity: AttachmentEntity,
	entityId: string,
	data: CreateAttachmentData,
) => {
	const user = await getSessionUserOrRedirect();

	const subject =
		entity === AttachmentEntity.TICKET
			? await prisma.ticket.findUnique({ where: { id: entityId } })
			: await prisma.comment.findUnique({ where: { id: entityId }, include: { ticket: true } });

	if (!subject) {
		return actionError('Subject not found');
	}

	if (!isOwner(user, subject)) {
		return actionError('Not the owner of this subject');
	}

	try {
		const { files } = createAttachmentServerSchema.parse(data);

		const organizationId = isTicket(subject)
			? subject.organizationId
			: subject.ticket.organizationId;

		for (const file of files) {
			const buffer = Buffer.from(await file.arrayBuffer());
			const attachment = await prisma.attachment.create({
				data: {
					name: file.name,
					entity,
					...(isTicket(subject) ? { ticketId: entityId } : { commentId: entityId }),
				},
			});

			const bucket = process.env.AWS_BUCKET_NAME;
			const key = generateS3Key({
				organizationId,
				entity,
				entityId,
				fileName: file.name,
				attachmentId: attachment.id,
			});
			const upload = { Bucket: bucket, Key: key, Body: buffer, ContentType: file.type };
			await s3.send(new PutObjectCommand(upload));
		}
	} catch (error) {
		return actionError(getErrorMessage(error, 'Failed to create attachment(s)'));
	}

	const ticketId = isTicket(subject) ? entityId : subject.ticket.id;
	revalidatePath(`/tickets/${ticketId}`);
	return actionSuccess();
};

export default createAttachment;
