import EmailVerification from '@/emails/auth/EmailVerification';
import { resend } from '@/lib/resend';

export type SendOtpParams = { email: string; name: string; otp: string };
const sendEmailVerification = async ({ email, name, otp }: SendOtpParams) => {
	return await resend.emails.send({
		from: 'no-reply@deibit.dev',
		to: email,
		subject: 'Verify Your Email - TicketBounty',
		react: <EmailVerification toName={name} otp={otp} />,
	});
};

export default sendEmailVerification;
