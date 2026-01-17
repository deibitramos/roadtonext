'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { s3 } from '@/lib/aws';
import { getErrorMessage } from '@/lib/error';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';
import {
	type CreateAttachmentData,
	createAttachmentServerSchema,
} from '../schemas/createAttachmentSchema';
import generateS3Key from '../utils/generateS3Key';

const createAttachment = async (ticketId: string, data: CreateAttachmentData) => {
	const user = await getSessionUserOrRedirect();

	const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
	if (!ticket) {
		return actionError('Ticket not found');
	}

	if (!isOwner(user, ticket)) {
		return actionError('Not the owner of this ticket');
	}

	try {
		const { files } = createAttachmentServerSchema.parse(data);

		for (const file of files) {
			const buffer = Buffer.from(await file.arrayBuffer());
			const attachment = await prisma.attachment.create({
				data: { name: file.name, ticketId },
			});

			const bucket = process.env.AWS_BUCKET_NAME;
			const key = generateS3Key({
				organizationId: ticket.organizationId,
				ticketId,
				fileName: file.name,
				attachmentId: attachment.id,
			});
			const upload = { Bucket: bucket, Key: key, Body: buffer, ContentType: file.type };
			await s3.send(new PutObjectCommand(upload));
		}
	} catch (error) {
		return actionError(getErrorMessage(error, 'Failed to create attachment(s)'));
	}

	revalidatePath(`/tickets/${ticketId}`);
	return actionSuccess();
};

export default createAttachment;
