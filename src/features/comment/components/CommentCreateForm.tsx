'use client';

import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputFile from '@/components/form/fields/InputFile';
import InputTextarea from '@/components/form/fields/InputTextarea';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import { ACCEPTED } from '@/features/attachments/constants';
import createComment from '../actions/createComment';
import { getCommentSchema } from '../schemas/createCommentSchema';

type Props = {
	ticketId: string;
	refresh: () => void;
};

function CreateForm({ ticketId, refresh }: Props) {
	const schema = getCommentSchema(true);
	const form = useForm(schema, {
		defaultValues: { content: '' },
		submit: async (data) => {
			const result = await createComment(ticketId, data);

			if (result.error) {
				toast.error(result.error.message);
			} else {
				toast.success('Comment created successfully');
				form.formHook.reset();
				refresh();
			}
		},
	});

	const { isSubmitting } = form.formHook.formState;

	return (
		<Form form={form}>
			<InputTextarea name="content" placeholder="What's on your mind?" />
			<InputFile name="files" id="files" multiple accept={ACCEPTED.join(',')} />
			<SubmitButton isSubmitting={isSubmitting}>Comment</SubmitButton>
		</Form>
	);
}

export default CreateForm;
