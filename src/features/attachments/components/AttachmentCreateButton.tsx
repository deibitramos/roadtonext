'use client';

import { PlusIcon } from 'lucide-react';
import SubmitButton from '@/components/form/SubmitButton';
import useModal from '@/components/hooks/useModal';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import type { AttachmentEntity } from '@/generated/prisma/browser';
import AttachmentCreateForm from './AttachmentCreateForm';

type Props = {
	entity: AttachmentEntity;
	entityId: string;
	refresh: () => void;
};

function AttachmentCreateButton({ entity, entityId, refresh }: Props) {
	const [open, openModal, closeModal] = useModal();
	const onSuccess = () => {
		closeModal();
		refresh();
	};

	return (
		<Dialog open={open} onOpenChange={openModal}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="w-4 h-4" />
					Invite Member
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite Member</DialogTitle>
					<DialogDescription>Invite a user by email to your organization</DialogDescription>
				</DialogHeader>
				<AttachmentCreateForm
					entity={entity}
					entityId={entityId}
					buttons={
						<DialogFooter>
							<Button type="button" variant="outline" onClick={closeModal}>
								Cancel
							</Button>
							<SubmitButton>Upload</SubmitButton>
						</DialogFooter>
					}
					onSuccess={onSuccess}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default AttachmentCreateButton;
