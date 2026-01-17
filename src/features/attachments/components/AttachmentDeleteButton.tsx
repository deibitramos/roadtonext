'use client';

import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';
import useModal from '@/components/hooks/useModal';
import { Button } from '@/components/ui/button';
import deleteAttachment from '../actions/deleteAttachment';

type Props = {
	id: string;
};

function AttachmentDeleteButton({ id }: Props) {
	const [open, openModal, closeModal] = useModal();
	const onSuccess = () => toast.success('Attachment deleted');

	return (
		<>
			<Button variant="outline" size="xs" onClick={openModal}>
				<TrashIcon className="size-4" />
			</Button>
			<ConfirmDialog
				open={open}
				closeModal={closeModal}
				action={deleteAttachment.bind(null, id)}
				onSuccess={onSuccess}
			/>
		</>
	);
}

export default AttachmentDeleteButton;
