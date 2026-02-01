'use client';

import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';
import useModal from '@/components/hooks/useModal';
import { Button } from '@/components/ui/button';
import deleteInvitation from '../actions/deleteInvitation';

type Props = {
	id: string;
};

function InvitationDeleteButton({ id }: Props) {
	const { open, openModal, closeModal } = useModal();
	const onSuccess = () => toast.success('Invitation deleted');

	return (
		<>
			<Button variant="destructive" onClick={openModal} className="border">
				<TrashIcon className="size-4" />
			</Button>
			<ConfirmDialog
				open={open}
				closeModal={closeModal}
				action={deleteInvitation.bind(null, id)}
				onSuccess={onSuccess}
			/>
		</>
	);
}

export default InvitationDeleteButton;
