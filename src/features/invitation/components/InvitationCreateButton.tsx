'use client';

import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
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
import createInvitation from '../actions/createInvitation';
import createInvitationSchema from '../schemas/createInvitationSchema';

type Props = {
	organizationId: string;
};

function InvitationCreateButton({ organizationId }: Props) {
	const [open, openModal, closeModal] = useModal();
	const form = useForm(createInvitationSchema, {
		submit: async (data) => {
			const { error } = await createInvitation(organizationId, data);

			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Invitation created');
				closeModal();
			}
		},
	});

	const { isSubmitting } = form.formHook.formState;

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
				<Form form={form}>
					<div className="grid gap-4 py-4">
						<InputText name="email" label="Email" placeholder="Email" />
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={closeModal}>
							Cancel
						</Button>
						<SubmitButton isSubmitting={isSubmitting}>Invite</SubmitButton>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default InvitationCreateButton;
