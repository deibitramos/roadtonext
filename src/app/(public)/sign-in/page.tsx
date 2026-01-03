import Link from 'next/dist/client/link';
import CardCompact from '@/components/CardCompact';
import SignInForm from '@/features/auth/components/SignInForm';
import { redirectIfAuthenticated } from '@/lib/auth/session';

const LoginFooter = (
	<>
		<Link className="text-sm text-muted-foreground" href="/sign-up">
			No account yet?
		</Link>
		<Link className="text-sm text-muted-foreground" href="/forgot-password">
			Forgot password?
		</Link>
	</>
);

export default async function SignInPage() {
	await redirectIfAuthenticated();

	return (
		<div className="flex flex-1 flex-col justify-center items-center">
			<CardCompact
				title="Sign In"
				description="Sign in to your account"
				className="w-full max-w-105 self-center animate-fade-from-top"
				footer={LoginFooter}
			>
				<SignInForm />
			</CardCompact>
		</div>
	);
}
