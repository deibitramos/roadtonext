'use client';

import { useActionState } from 'react';
import ActionForm from '@/components/form/ActionForm';
import FieldError from '@/components/form/FieldError';
import SubmitButton from '@/components/form/SubmitButton';
import { type ActionState, EMPTY_ACTION_STATE } from '@/components/form/utils/toActionState';
import { Textarea } from '@/components/ui/textarea';
import createComment from '../actions/createComment';
import type { CommentWithUser } from '../queries/getComments';

type Props = {
	ticketId: string;
	onCreate?(comment: CommentWithUser | undefined): void;
};

function CreateForm({ ticketId, onCreate }: Props) {
	const [actionState, action] = useActionState(
		createComment.bind(null, ticketId),
		EMPTY_ACTION_STATE as ActionState<CommentWithUser>,
	);

	const handleSuccess = (actionState: ActionState<CommentWithUser>) => {
		onCreate?.(actionState.data);
	};

	return (
		<ActionForm action={action} actionState={actionState} onSuccess={handleSuccess}>
			<Textarea name="content" placeholder="What's on your mind?" />
			<FieldError actionState={actionState} name="content" />
			<SubmitButton>Comment</SubmitButton>
		</ActionForm>
	);
}

export default CreateForm;
