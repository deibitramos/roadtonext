import CardCompact from '@/components/CardCompact';
import isOwner from '@/features/auth/utils/isOwner';
import { getSessionUser } from '@/lib/auth/session';
import getComments from '../queries/getComments';
import CommentDeleteButton from './CommentDeleteButton';
import CommentItem from './CommentItem';
import CreateForm from './CreateForm';

type Props = {
	ticketId: string;
};

async function Comments({ ticketId }: Props) {
	const comments = await getComments(ticketId);
	const user = await getSessionUser();

	return (
		<>
			<CardCompact title="Create Comment" description="A new comment will be created">
				<CreateForm ticketId={ticketId} />
			</CardCompact>
			<div className="flex flex-col gap-y-2 ml-8">
				{comments
					.map((comment) => {
						const owner = isOwner(user, comment);
						if (!owner) return null;
						return (
							<CommentItem
								key={comment.id}
								comment={comment}
								buttons={[<CommentDeleteButton key={comment.id} id={comment.id} />]}
							/>
						);
					})
					.filter(Boolean)}
			</div>
		</>
	);
}

export default Comments;
