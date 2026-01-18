import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { NextRequest } from 'next/server';
import { isTicket } from '@/features/attachments/types';
import generateS3Key from '@/features/attachments/utils/generateS3Key';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { s3 } from '@/lib/aws';
import prisma from '@/lib/prisma';

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ attachmentId: string }> },
) {
	await getSessionUserOrRedirect();

	const { attachmentId } = await params;
	const attachment = await prisma.attachment.findUniqueOrThrow({
		where: { id: attachmentId },
		include: { ticket: true, comment: { include: { ticket: true } } },
	});

	const subject = attachment.ticket ?? attachment.comment;
	if (!subject) {
		throw new Error('Subject not found');
	}

	const organizationId = isTicket(subject) ? subject.organizationId : subject.ticket.organizationId;
	const key = generateS3Key({
		organizationId,
		entity: attachment.entity,
		entityId: subject.id,
		fileName: attachment.name,
		attachmentId: attachment.id,
	});

	const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key });
	const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 5 * 60 });

	const response = await fetch(presignedUrl);
	const headers = new Headers();
	headers.append('content-disposition', `attachment; filename="${attachment.name}"`);
	return new Response(response.body, { headers });
}
