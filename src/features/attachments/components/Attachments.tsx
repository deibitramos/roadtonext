import CardCompact from '@/components/CardCompact';
import getAttachments from '../actions/getAttachments';
import AttachmentCreateForm from './AttachmentCreateForm';
import AttachmentDeleteButton from './AttachmentDeleteButton';
import AttachmentItem from './AttachmentItem';

type Props = {
	ticketId: string;
	owner: boolean;
};

async function Attachments({ ticketId, owner }: Props) {
	const attachments = await getAttachments(ticketId);

	return (
		<CardCompact title="Attachments" description="Attached images or PDFs">
			<div className="mx-2 flex flex-col gap-y-2 mb-4">
				{attachments.map((attachment) => {
					const buttons = owner
						? [<AttachmentDeleteButton key={attachment.id} id={attachment.id} />]
						: [];
					return <AttachmentItem key={attachment.id} attachment={attachment} buttons={buttons} />;
				})}
			</div>
			{owner && <AttachmentCreateForm ticketId={ticketId} />}
		</CardCompact>
	);
}

export default Attachments;

//
