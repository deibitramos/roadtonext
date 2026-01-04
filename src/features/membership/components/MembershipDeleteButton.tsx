'use client';

import { LogOutIcon } from 'lucide-react';
import ConfirmDialog from '@/components/ConfirmDialog';
import useModal from '@/components/hooks/useModal';
import { Button } from '@/components/ui/button';
import deleteMembership from '../actions/deleteMembership';

type Props = {
	userId: string;
	organizationId: string;
};

function MembershipDeleteButton({ userId, organizationId }: Props) {
	const [open, openModal, closeModal] = useModal();
	return (
		<>
			<Button variant="destructive" onClick={openModal}>
				<LogOutIcon className="size-4" />
			</Button>
			<ConfirmDialog
				open={open}
				closeModal={closeModal}
				action={deleteMembership.bind(null, userId, organizationId)}
			/>
		</>
	);
}

export default MembershipDeleteButton;
