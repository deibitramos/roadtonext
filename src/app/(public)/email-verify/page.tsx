import CardCompact from '@/components/CardCompact';
import EmailVerifyForm from '@/features/auth/components/EmailVerifyForm';

function EmailVerifyPage() {
	return (
		<div className="flex flex-1 flex-col justify-center items-center">
			<CardCompact
				title="Verify Email"
				description="Please enter the verification code sent to your email"
				className="w-full max-w-105 self-center animate-fade-from-top"
			>
				<EmailVerifyForm />
			</CardCompact>
		</div>
	);
}

export default EmailVerifyPage;
