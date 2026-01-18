import AttachmentCreateButton from '@/features/attachments/components/AttachmentCreateButton';
import AttachmentDeleteButton from '@/features/attachments/components/AttachmentDeleteButton';
import AttachmentList from '@/features/attachments/components/AttachmentList';
import { AttachmentEntity } from '@/generated/prisma/browser';
import type { CommentWithUser } from '../../queries/getComments';
import CommentDeleteButton from '../CommentDeleteButton';
import CommentItem, { type CommentSection } from '../CommentItem';

type Props = {
	comments: CommentWithUser[];
	refresh: () => void;
};

function CommentList({ comments, refresh }: Props) {
	return (
		<div className="flex flex-col gap-y-2 ml-8">
			{comments
				.map((comment) => {
					const { id } = comment;
					const deleteButton = (
						<CommentDeleteButton key={`del-${id}`} id={comment.id} refresh={refresh} />
					);
					const attachmentCreateButton = (
						<AttachmentCreateButton
							key={`att-${id}`}
							entity={AttachmentEntity.COMMENT}
							entityId={comment.id}
							refresh={refresh}
						/>
					);
					const buttons = comment.owner ? [deleteButton, attachmentCreateButton] : [];

					const sections: CommentSection[] = [];
					if (comment.attachments.length) {
						const buttonsRenderer = (id: string) => {
							return comment.owner
								? [<AttachmentDeleteButton key={id} id={id} refresh={refresh} />]
								: [];
						};
						sections.push({
							label: 'Attachments',
							content: (
								<AttachmentList attachments={comment.attachments} buttons={buttonsRenderer} />
							),
						});
					}

					return (
						<CommentItem key={comment.id} comment={comment} buttons={buttons} sections={sections} />
					);
				})
				.filter(Boolean)}
		</div>
	);
}

export default CommentList;
