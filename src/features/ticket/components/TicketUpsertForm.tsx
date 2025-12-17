'use client';

import { useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { DatePicker, type DatePickerImperativeHandle } from '@/components/DatePicker';
import ActionForm from '@/components/form/ActionForm';
import FieldError from '@/components/form/FieldError';
import SubmitButton from '@/components/form/SubmitButton';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/toActionState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fromCent } from '@/utils/currency';
import upsertTicket from '../actions/upsertTicket';
import type { TicketWithUser } from '../queries/getTicket';

type Props = {
	ticket?: TicketWithUser;
};

function TicketUpsertForm({ ticket }: Props) {
	const [actionState, action] = useActionState(
		upsertTicket.bind(null, ticket?.id),
		EMPTY_ACTION_STATE,
	);
	const { pending } = useFormStatus();

	const datePickerImperativeHandleRef = useRef<DatePickerImperativeHandle>(null);

	const onSuccess = () => {
		datePickerImperativeHandleRef.current?.reset();
	};

	return (
		<ActionForm action={action} actionState={actionState} onSuccess={onSuccess}>
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

			<div className="grid grid-cols-2 gap-4">
				<div>
					<Label htmlFor="deadline">Deadline:</Label>
					<DatePicker
						id="deadline"
						name="deadline"
						defaultValue={(actionState?.payload?.get('deadline') as string) ?? ticket?.deadline}
						imperativeHandleRef={datePickerImperativeHandleRef}
					/>
					<FieldError actionState={actionState} name="deadline" />
				</div>

				<div>
					<Label htmlFor="bounty">Bounty:</Label>
					<Input
						id="bounty"
						name="bounty"
						type="number"
						step=".01"
						defaultValue={
							(actionState?.payload?.get('bounty') as string) ??
							(ticket?.bounty ? fromCent(ticket.bounty) : '')
						}
					/>
					<FieldError actionState={actionState} name="bounty" />
				</div>
			</div>

			<SubmitButton isSubmitting={pending}>{ticket ? 'Update' : 'Create'}</SubmitButton>
		</ActionForm>
	);
}

export default TicketUpsertForm;
