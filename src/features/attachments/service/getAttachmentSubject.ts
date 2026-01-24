import { AttachmentEntity } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const getAttachmentSubject = async (entity: AttachmentEntity, entityId: string) => {
	const subject =
		entity === AttachmentEntity.TICKET
			? await prisma.ticket.findUnique({ where: { id: entityId } })
			: await prisma.comment.findUnique({ where: { id: entityId }, include: { ticket: true } });

	return subject ?? null;
};
