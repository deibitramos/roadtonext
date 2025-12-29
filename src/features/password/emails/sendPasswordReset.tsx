import EmailPasswordReset from '@/emails/password/EmailPasswordReset';
import { resend } from '@/lib/resend';

export type UserMailData = { email: string; name: string };
const sendPasswordReset = async ({ email, name }: UserMailData, url: string) => {
	return await resend.emails.send({
		from: 'no-reply@deibit.dev',
		to: email,
		subject: 'Password Reset from TicketBounty',
		react: <EmailPasswordReset toName={name} url={url} />,
	});
};

export default sendPasswordReset;
