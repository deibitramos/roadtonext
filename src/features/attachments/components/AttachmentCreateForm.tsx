'use client';

import type { ReactNode } from 'react';
import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputFile from '@/components/form/fields/InputFile';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import type { AttachmentEntity } from '@/generated/prisma/client';
import createAttachment from '../actions/createAttachment';
import { ACCEPTED } from '../constants';
import { getClientFilesSchema } from '../schemas/createAttachmentSchema';

type Props = {
	entityId: string;
	entity: AttachmentEntity;
	buttons?: ReactNode;
	onSuccess?: () => void;
};

function AttachmentCreateForm({ entityId, entity, buttons, onSuccess }: Props) {
	const schema = getClientFilesSchema(true);
	const form = useForm(schema, {
		submit: async (data) => {
			const { error } = await createAttachment(entity, entityId, data);
			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Attachment(s) uploaded');
				onSuccess?.();
			}
		},
	});

	return (
		<Form form={form}>
			<InputFile name="files" id="files" multiple accept={ACCEPTED.join(',')} />
			{buttons || <SubmitButton>Upload</SubmitButton>}
		</Form>
	);
}

export default AttachmentCreateForm;
