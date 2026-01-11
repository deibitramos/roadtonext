'use client';

import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import createOrganization from '@/organization/actions/createOrganization';
import createOrganizationSchema from '../schemas/createOrganizationSchema';

function OrganizationCreateForm() {
	const form = useForm(createOrganizationSchema, {
		submit: async (data) => {
			const { error } = await createOrganization(data);

			if (error) {
				toast.error(error.message);
			}
		},
	});

	const { isSubmitting } = form.formHook.formState;

	return (
		<Form form={form}>
			<InputText name="name" placeholder="Name" />
			<SubmitButton isSubmitting={isSubmitting}>Create</SubmitButton>
		</Form>
	);
}

export default OrganizationCreateForm;
