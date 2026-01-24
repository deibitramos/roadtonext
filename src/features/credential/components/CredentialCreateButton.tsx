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
import createCredential from '../actions/createCredential';
import createCredentialSchema from '../schemas/createCredentialSchema';

type Props = {
	organizationId: string;
};

function CredentialCreateButton({ organizationId }: Props) {
	const [open, openModal, closeModal] = useModal();
	const form = useForm(createCredentialSchema, {
		submit: async (data) => {
			const { error } = await createCredential(organizationId, data);

			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Credential created', { duration: Infinity, closeButton: true });
				closeModal();
			}
		},
	});

	const { isSubmitting } = form.formHook.formState;

	return (
		<Dialog open={open} onOpenChange={openModal}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="size-4" />
					Create Credential
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Credential</DialogTitle>
					<DialogDescription>Create a new API secret for your organization</DialogDescription>
				</DialogHeader>
				<Form form={form}>
					<div className="grid gap-4 py-4">
						<InputText name="name" label="Name" placeholder="Name" />
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={closeModal}>
							Cancel
						</Button>
						<SubmitButton isSubmitting={isSubmitting}>Create</SubmitButton>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default CredentialCreateButton;
