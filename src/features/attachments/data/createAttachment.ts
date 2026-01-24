import { AttachmentEntity } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

type Args = {
	name: string;
	entity: AttachmentEntity;
	entityId: string;
};

export const createAttachment = async ({ name, entity, entityId }: Args) => {
	const attachment = await prisma.attachment.create({
		data: {
			name,
			entity,
			...(entity === AttachmentEntity.TICKET ? { ticketId: entityId } : {}),
			...(entity === AttachmentEntity.COMMENT ? { commentId: entityId } : {}),
		},
	});
	return attachment;
};
