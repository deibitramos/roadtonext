'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import ActionForm from '@/components/form/ActionForm';
import FieldError from '@/components/form/FieldError';
import SubmitButton from '@/components/form/SubmitButton';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/toActionState';
import { Textarea } from '@/components/ui/textarea';
import createComment from '../actions/createComment';

type Props = {
	ticketId: string;
};

function CreateForm({ ticketId }: Props) {
	const [actionState, action] = useActionState(
		createComment.bind(null, ticketId),
		EMPTY_ACTION_STATE,
	);
	const { pending } = useFormStatus();

	return (
		<ActionForm action={action} actionState={actionState}>
			<Textarea name="content" placeholder="What's on your mind?" />
			<FieldError actionState={actionState} name="content" />
			<SubmitButton isSubmitting={pending}>Comment</SubmitButton>
		</ActionForm>
	);
}

export default CreateForm;
