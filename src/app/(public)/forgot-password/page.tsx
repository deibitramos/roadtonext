import CardCompact from '@/components/CardCompact';
import PasswordForgotForm from '@/features/password/components/PasswordForgotForm';
import { redirectIfAuthenticated } from '@/lib/auth/session';

export default async function ForgotPasswordPage() {
	await redirectIfAuthenticated();
	return (
		<div className="flex flex-1 flex-col justify-center items-center">
			<CardCompact
				title="Forgot Password"
				description="Enter your email to reset your password"
				className="w-full max-w-105 self-center animate-fade-from-top"
			>
				<PasswordForgotForm />
			</CardCompact>
		</div>
	);
}
