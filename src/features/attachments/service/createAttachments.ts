import { PutObjectCommand } from '@aws-sdk/client-s3';
import * as db from '@/features/attachments/data';
import type { Attachment, AttachmentEntity } from '@/generated/prisma/client';
import { s3 } from '@/lib/aws';
import { type AttachmentSubject, isTicket } from '../types';
import generateS3Key from '../utils/generateS3Key';

type Args = {
	subject: AttachmentSubject;
	entity: AttachmentEntity;
	entityId: string;
	files: File[];
};
export const createAttachments = async ({ subject, entity, entityId, files }: Args) => {
	const attachments: Attachment[] = [];
	const organizationId = isTicket(subject) ? subject.organizationId : subject.ticket.organizationId;

	for (const file of files) {
		const buffer = Buffer.from(await file.arrayBuffer());
		const attachment = await db.createAttachment({ name: file.name, entity, entityId });
		attachments.push(attachment);

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
	return attachments;
};

// return actionError(getErrorMessage(error, 'Failed to create attachment(s)'));
