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
		submit: async (data) => {
			const response = await signIn.email(data);

			if (response.error) {
				toast.error(response.error.message);
			} else {
				redirect('/tickets');
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
