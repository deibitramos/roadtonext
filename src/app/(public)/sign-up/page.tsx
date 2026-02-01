import Link from 'next/link';
import CardCompact from '@/components/CardCompact';
import SignUpForm from '@/features/auth/components/SignUpForm';
import { redirectIfAuthenticated } from '@/lib/auth/session';

export default async function SignUpPage() {
	await redirectIfAuthenticated();

	return (
		<div className="flex flex-1 flex-col justify-center items-center">
			<CardCompact
				title="Sign Up"
				description="Create an account to start your own organization. To join an existing organization, ask an admin to send you an invite."
				className="w-full max-w-105 self-center animate-fade-from-top"
				footer={
					<Link className="text-sm text-muted-foreground" href="/sign-in">
						Already have an account? Sign In
					</Link>
				}
			>
				<SignUpForm />
			</CardCompact>
		</div>
	);
}
