import { AttachmentEntity } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

const getAttachments = async (entityId: string, entity: AttachmentEntity) => {
	const where = {
		entity,
		...(entity === AttachmentEntity.TICKET ? { ticketId: entityId } : { commentId: entityId }),
	};

	return await prisma.attachment.findMany({ where });
};

export default getAttachments;
