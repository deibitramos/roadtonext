'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import resetPasswordSchema from '@/features/auth/schemas/resetPasswordSchema';
import { resetPassword } from '@/lib/auth/client';

type Props = { token: string };

function ResetPasswordForm({ token }: Props) {
	const router = useRouter();

	const form = useForm(resetPasswordSchema, {
		submit: async ({ password }) => {
			const { error } = await resetPassword({ newPassword: password, token });

			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Password reset successfully! Redirecting to sign in...');
				setTimeout(() => router.push('/sign-in'), 2000);
			}
		},
	});

	const { isSubmitting } = form.formHook.formState;

	return (
		<Form form={form}>
			<InputText type="password" name="password" placeholder="New Password" />
			<InputText type="password" name="confirmPassword" placeholder="Confirm Password" />
			<SubmitButton isSubmitting={isSubmitting}>Reset Password</SubmitButton>
		</Form>
	);
}

export default ResetPasswordForm;
