import inngest, { signUpEvent } from '@/lib/inngest';
import prisma from '@/lib/prisma';
import sendEmailVerification from '../emails/sendEmailVerification';

const eventSignUp = inngest.createFunction(
	{ id: 'auth-sign-up', triggers: [signUpEvent] },
	async ({ event }) => {
		const { email, otp } = event.data;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return;
		const result = await sendEmailVerification({ email, name: user.name, otp });
		return { event, body: result };
	},
);

export default eventSignUp;
