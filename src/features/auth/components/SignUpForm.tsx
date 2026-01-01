'use client';

import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import { signUp } from '@/lib/auth/client';
import signUpSchema from '../schemas/signUpSchema';

function SignUpForm() {
	const form = useForm(signUpSchema, {
		submit: async (data) => {
			const response = await signUp.email(data);

			if (response.error) {
				toast.error(response.error.message);
			} else {
				toast.success('Account created! Please check your email for verification code.');
				// User is now authenticated (but unverified), redirect to verification page
				redirect('/email-verify');
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
