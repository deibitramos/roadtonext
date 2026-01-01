'use client';

import { redirect } from 'next/dist/client/components/navigation';
import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import { signIn } from '@/lib/auth/client';
import signInSchema from '../schemas/signInSchema';

function SignInForm() {
	const form = useForm(signInSchema, {
		submit: async (signInData) => {
			const { data, error } = await signIn.email(signInData);

			if (error) {
				toast.error(error.message);
			} else {
				// Check if email is verified
				if (!data.user.emailVerified) {
					toast.info('Please verify your email to continue');
					redirect('/email-verify');
				} else {
					redirect('/tickets');
				}
			}
		},
	});

	const { isSubmitting } = form.formHook.formState;

	return (
		<Form form={form}>
			<InputText name="email" placeholder="Email" />
			<InputText type="password" name="password" placeholder="Password" />
			<SubmitButton isSubmitting={isSubmitting}>Sign In</SubmitButton>
		</Form>
	);
}

export default SignInForm;
