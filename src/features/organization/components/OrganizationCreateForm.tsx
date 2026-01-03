'use client';

import { useActionState } from 'react';
import ActionForm from '@/components/form/ActionForm';
import FieldError from '@/components/form/FieldError';
import SubmitButton from '@/components/form/SubmitButton';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/toActionState';
import { Input } from '@/components/ui/input';
import createOrganization from '@/organization/actions/createOrganization';

function OrganizationCreateForm() {
	const [actionState, action] = useActionState(createOrganization, EMPTY_ACTION_STATE);

	return (
		<ActionForm action={action} actionState={actionState}>
			<Input
				name="name"
				placeholder="Name"
				defaultValue={actionState.payload?.get('name') as string}
			/>
			<FieldError actionState={actionState} name="name" />

			<SubmitButton>Create</SubmitButton>
		</ActionForm>
	);
}

export default OrganizationCreateForm;
