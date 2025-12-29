import { auth } from '@/lib/auth/server';
import inngest from '@/lib/inngest';

const passwordResetEvent = inngest.createFunction(
	{ id: 'password-reset' },
	{ event: 'app/password.password-reset' },
	async ({ event }) => {
		const { email } = event.data;
		console.log('Received password reset event for email:', email);
		const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`;
		console.log('Redirect URL:', redirectTo);
		const result = await auth.api.requestPasswordReset({ body: { email, redirectTo } });
		console.log('result', result);
		return { event, body: result };
	},
);

export default passwordResetEvent;
