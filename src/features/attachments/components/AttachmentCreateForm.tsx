'use client';

import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputFile from '@/components/form/fields/InputFile';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import createAttachment from '../actions/createAttachment';
import { ACCEPTED } from '../constants';
import createAttachmentSchema from '../schemas/createAttachmentSchema';

type Props = {
	ticketId: string;
};

function AttachmentCreateForm({ ticketId }: Props) {
	const form = useForm(createAttachmentSchema, {
		submit: async (data) => {
			const { error } = await createAttachment(ticketId, data);
			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Attachment(s) uploaded');
			}
		},
	});

	return (
		<Form form={form}>
			<InputFile name="files" id="files" multiple accept={ACCEPTED.join(',')} />
			<SubmitButton>Upload</SubmitButton>
		</Form>
	);
}

export default AttachmentCreateForm;
