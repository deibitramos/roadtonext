'use client';

import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import signUp from '../actions/signUp';
import signUpSchema from '../schemas/signUpSchema';

function SignUpForm() {
	const form = useForm(signUpSchema, {
		submit: async (data) => {
			const { error } = await signUp(data);
			if (error) {
				toast.error(error.message);
			}
		},
	});

	const { isSubmitting } = form.formHook.formState;

	return (
		<Form form={form}>
			<InputText name="name" placeholder="Name" />
			<InputText name="email" placeholder="Email" />
			<InputText type="password" name="password" placeholder="Password" />
			<InputText type="password" name="confirmPassword" placeholder="Confirm Password" />
			<SubmitButton isSubmitting={isSubmitting}>Sign Up</SubmitButton>
		</Form>
	);
}

export default SignUpForm;
