'use client';

import { useActionState } from 'react';
import FieldError from '@/components/form/FieldError';
import Form from '@/components/form/Form';
import SubmitButton from '@/components/form/SubmitButton';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/toActionState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Ticket } from '@/generated/prisma/client';
import upsertTicket from '../actions/upsertTicket';

type Props = {
	ticket?: Ticket;
};

function TicketUpsertForm({ ticket }: Props) {
	const [actionState, action] = useActionState(
		upsertTicket.bind(null, ticket?.id),
		EMPTY_ACTION_STATE,
	);

	return (
		<Form action={action} actionState={actionState}>
			<Label htmlFor="title">Title:</Label>
			<Input
				id="title"
				name="title"
				type="text"
				defaultValue={(actionState?.payload?.get('title') as string) ?? ticket?.title}
			/>
			<FieldError actionState={actionState} name="title" />

			<Label htmlFor="content">Content:</Label>
			<Textarea
				id="content"
				name="content"
				defaultValue={(actionState?.payload?.get('content') as string) ?? ticket?.content}
			/>
			<FieldError actionState={actionState} name="content" />

			<SubmitButton label={ticket ? 'Update' : 'Create'} />
		</Form>
	);
}

export default TicketUpsertForm;
