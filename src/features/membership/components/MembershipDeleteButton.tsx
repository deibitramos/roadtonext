'use client';

import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';
import useModal from '@/components/hooks/useModal';
import { Button } from '@/components/ui/button';
import deleteMembership from '../actions/deleteMembership';

type Props = {
	userId: string;
	organizationId: string;
	myself: boolean;
};

function MembershipDeleteButton({ userId, organizationId, myself }: Props) {
	const { open, openModal, closeModal } = useModal();
	const toastMessage = myself ? 'You left the organization' : 'Membership deleted successfully';
	const onSuccess = () => toast.success(toastMessage);

	return (
		<>
			<Button variant="destructive" onClick={openModal} className="border">
				<LogOutIcon className="size-4" />
			</Button>
			<ConfirmDialog
				open={open}
				closeModal={closeModal}
				action={deleteMembership.bind(null, userId, organizationId)}
				onSuccess={onSuccess}
			/>
		</>
	);
}

export default MembershipDeleteButton;
