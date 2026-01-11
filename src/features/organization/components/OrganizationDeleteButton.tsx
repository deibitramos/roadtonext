'use client';

import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';
import useModal from '@/components/hooks/useModal';
import { Button } from '@/components/ui/button';
import deleteOrganization from '@/organization/actions/deleteOrganization';

type Props = {
	organizationId: string;
};

function OrganizationDeleteButton({ organizationId }: Props) {
	const [open, openModal, closeModal] = useModal();
	const onSuccess = () => toast.success('Organization deleted successfully');
	return (
		<>
			<Button variant="destructive" onClick={openModal} className="border">
				<TrashIcon className="size-4" />
			</Button>
			<ConfirmDialog
				open={open}
				closeModal={closeModal}
				action={deleteOrganization.bind(null, organizationId)}
				onSuccess={onSuccess}
			/>
		</>
	);
}

export default OrganizationDeleteButton;
