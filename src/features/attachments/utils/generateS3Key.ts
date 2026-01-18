import type { AttachmentEntity } from '@/generated/prisma/client';

type Params = {
	organizationId: string;
	entity: AttachmentEntity;
	entityId: string;
	fileName: string;
	attachmentId: string;
};

const generateS3Key = ({ organizationId, entity, entityId, fileName, attachmentId }: Params) => {
	return `${organizationId}/${entity}/${entityId}/${fileName}-${attachmentId}`;
};

export default generateS3Key;
