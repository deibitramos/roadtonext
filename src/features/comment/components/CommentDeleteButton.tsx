'use client';

import { TrashIcon } from 'lucide-react';
import ActionConfirmDialog from '@/components/ActionConfirmDialog';
import useModal from '@/components/hooks/useModal';
import { Button } from '@/components/ui/button';
import deleteComment from '../actions/deleteComment';

type Props = {
	id: string;
	refresh: () => void;
};

function CommentDeleteButton({ id, refresh }: Props) {
	const [open, openModal, closeModal] = useModal();

	return (
		<>
			<Button variant="outline" size="icon" onClick={openModal}>
				<TrashIcon className="size-4" />
			</Button>
			<ActionConfirmDialog
				open={open}
				closeModal={closeModal}
				action={deleteComment.bind(null, id)}
				onSuccess={refresh}
			/>
		</>
	);
}

export default CommentDeleteButton;
