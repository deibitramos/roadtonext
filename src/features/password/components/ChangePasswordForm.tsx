'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Form from '@/components/form/Form';
import InputText from '@/components/form/fields/InputText';
import useForm from '@/components/form/hooks/useForm';
import SubmitButton from '@/components/form/SubmitButton';
import changePasswordSchema from '@/features/auth/schemas/changePasswordSchema';
import { changePassword } from '@/lib/auth/client';

function ChangePasswordForm() {
	const router = useRouter();

	const form = useForm(changePasswordSchema, {
		submit: async ({ currentPassword, password }) => {
			const { error } = await changePassword({ currentPassword, newPassword: password });

			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Password changed successfully!');
				setTimeout(() => router.push('/account/profile'), 2000);
			}
		},
	});

	const { isSubmitting } = form.formHook.formState;

	return (
		<Form form={form}>
			<InputText type="password" name="currentPassword" placeholder="Current Password" />
			<InputText type="password" name="password" placeholder="New Password" />
			<InputText type="password" name="confirmPassword" placeholder="Confirm Password" />
			<SubmitButton isSubmitting={isSubmitting}>Change Password</SubmitButton>
		</Form>
	);
}

export default ChangePasswordForm;
