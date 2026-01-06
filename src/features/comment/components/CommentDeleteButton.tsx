'use client';

import { TrashIcon } from 'lucide-react';
import ActionConfirmDialog from '@/components/ActionConfirmDialog';
import useModal from '@/components/hooks/useModal';
import { Button } from '@/components/ui/button';
import deleteComment from '../actions/deleteComment';

type Props = {
	id: string;
	onDelete?: (id: string) => void;
};

function CommentDeleteButton({ id, onDelete }: Props) {
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
				onSuccess={() => onDelete?.(id)}
			/>
		</>
	);
}

export default CommentDeleteButton;
