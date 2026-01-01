'use client';

import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import forgotPasswordSchema from '@/features/auth/schemas/forgotPasswordSchema';
import { requestPasswordReset } from '@/lib/auth/client';

function PasswordForgotForm() {
	const form = useForm(forgotPasswordSchema, {
		submit: async ({ email }) => {
			const redirectTo = `${window.location.origin}/reset-password`;
			await requestPasswordReset({ email, redirectTo });
			toast.success('If this email exists in our system, check it for the reset link.');
		},
	});

	const { isSubmitting } = form.formHook.formState;

	return (
		<Form form={form}>
			<InputText name="email" placeholder="Email" />
			<SubmitButton isSubmitting={isSubmitting}>Send Reset Link</SubmitButton>
		</Form>
	);
}

export default PasswordForgotForm;
