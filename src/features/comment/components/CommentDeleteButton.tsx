'use client';

import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Button } from '@/components/ui/button';
import deleteComment from '../actions/deleteComment';

type Props = {
	id: string;
};

function CommentDeleteButton({ id }: Props) {
	const [open, setIsOpen] = useState(false);

	const onClick = () => {
		setIsOpen(true);
	};

	return (
		<>
			<Button variant="outline" size="icon" onClick={onClick}>
				<TrashIcon className="size-4" />
			</Button>
			<ConfirmDialog open={open} onOpenChange={setIsOpen} action={deleteComment.bind(null, id)} />
		</>
	);
}

export default CommentDeleteButton;
