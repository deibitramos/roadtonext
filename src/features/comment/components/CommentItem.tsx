import { format } from 'date-fns/format';
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import type { CommentWithUser } from '../queries/getComments';

type Props = {
	comment: CommentWithUser;
	buttons: ReactNode[];
};

function CommentItem({ comment, buttons }: Props) {
	return (
		<div className="flex gap-x-2">
			<Card className="p-4 flex-1 flex flex-col gap-y-1">
				<div className="flex justify-between">
					<p className="text-sm text-muted-foreground">{comment.user?.name ?? 'Deleted User'}</p>
					<p className="text-sm text-muted-foreground">
						{format(comment.createdAt, 'yyyy-MM-dd HH:mm')}
					</p>
				</div>
				<p className="whitespace-pre-line">{comment.content}</p>
			</Card>
			<div className="flex flex-col gap-y-1">{buttons}</div>
		</div>
	);
}

export default CommentItem;
