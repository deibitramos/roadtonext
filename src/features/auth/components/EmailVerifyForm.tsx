'use client';

import { useTransition } from 'react';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import resendVerificationCode from '../actions/resendVerificationCode';
import verifyEmail from '../actions/verifyEmail';
import emailVerifySchema from '../schemas/emailVerifySchema';

function EmailVerifyForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm(emailVerifySchema, {
		submit: async ({ code }) => {
			await verifyEmail(code);
		},
	});

	const { isSubmitting } = form.formHook.formState;

	const handleResendCode = () => {
		startTransition(async () => {
			await resendVerificationCode();
		});
	};

	return (
		<Form form={form}>
			<InputText name="code" placeholder="Enter verification code" />
			<div className="flex justify-between">
				<SubmitButton isSubmitting={isSubmitting}>Verify</SubmitButton>
				<SubmitButton
					type="button"
					variant="outline"
					onClick={handleResendCode}
					isSubmitting={isPending}
				>
					Resend Code
				</SubmitButton>
			</div>
		</Form>
	);
}

export default EmailVerifyForm;
