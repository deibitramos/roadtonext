import { ArrowUpRightFromSquareIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Attachment } from '@/generated/prisma/client';

type Props = {
	attachment: Attachment;
	buttons: ReactNode[];
};

function AttachmentItem({ attachment, buttons }: Props) {
	return (
		<div className="flex justify-between items-center">
			<Link
				className="flex gap-x-2 items-center text-sm truncate"
				href={`/api/aws/s3/attachments/${attachment.id}` as Route}
			>
				<ArrowUpRightFromSquareIcon className="size-4" />
				{attachment.name}
			</Link>
			{buttons}
		</div>
	);
}

export default AttachmentItem;
