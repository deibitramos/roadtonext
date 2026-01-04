import { ShieldAlertIcon } from 'lucide-react';
import CardCompact from '@/components/CardCompact';
import Placeholder from '@/components/Placeholder';
import ResetPasswordForm from '@/features/password/components/ResetPasswordForm';
import { redirectIfAuthenticated } from '@/lib/auth/session';

type Props = {
	searchParams: Promise<{ token?: string; error?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
	await redirectIfAuthenticated();
	const params = await searchParams;
	const { token, error } = params;

	if (error === 'INVALID_TOKEN' || !token) {
		return (
			<Placeholder label="Invalid or Expired Token" icon={ShieldAlertIcon}>
				<p className="text-sm text-muted-foreground text-center">
					The password reset link is invalid or has expired. Please request a new one.
				</p>
			</Placeholder>
		);
	}

	return (
		<div className="flex flex-1 flex-col justify-center items-center">
			<CardCompact
				title="Reset Password"
				description="Enter your new password"
				className="w-full max-w-105 self-center animate-fade-from-top"
			>
				<ResetPasswordForm token={token} />
			</CardCompact>
		</div>
	);
}
