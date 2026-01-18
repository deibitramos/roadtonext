import type { ReactNode } from 'react';
import type { Attachment } from '@/generated/prisma/client';
import AttachmentItem from './AttachmentItem';

type Props = {
	attachments: Attachment[];
	buttons: (id: string) => ReactNode[];
};

function AttachmentList({ attachments, buttons }: Props) {
	return (
		<div className="mx-2 flex flex-col gap-y-2 mb-4">
			{attachments.map((attachment) => {
				return (
					<AttachmentItem
						key={attachment.id}
						attachment={attachment}
						buttons={buttons(attachment.id)}
					/>
				);
			})}
		</div>
	);
}

export default AttachmentList;
