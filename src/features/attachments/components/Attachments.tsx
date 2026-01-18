import CardCompact from '@/components/CardCompact';
import type { AttachmentEntity } from '@/generated/prisma/client';
import getAttachments from '../actions/getAttachments';
import AttachmentCreateForm from './AttachmentCreateForm';
import AttachmentDeleteButton from './AttachmentDeleteButton';
import AttachmentList from './AttachmentList';

type Props = {
	entityId: string;
	owner: boolean;
	entity: AttachmentEntity;
};

async function Attachments({ entityId, entity, owner }: Props) {
	const attachments = await getAttachments(entityId, entity);

	const buttonsRenderer = (id: string) => {
		return owner ? [<AttachmentDeleteButton key={id} id={id} />] : [];
	};

	return (
		<CardCompact title="Attachments" description="Attached images or PDFs">
			<AttachmentList attachments={attachments} buttons={buttonsRenderer} />
			{owner && <AttachmentCreateForm entityId={entityId} entity={entity} />}
		</CardCompact>
	);
}

export default Attachments;
