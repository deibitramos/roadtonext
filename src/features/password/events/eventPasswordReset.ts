import inngest from '@/lib/inngest';
import prisma from '@/lib/prisma';
import sendPasswordReset from '../emails/sendPasswordReset';

const eventPasswordReset = inngest.createFunction(
	{ id: 'password-reset' },
	{ event: 'app/password.password-reset' },
	async ({ event }) => {
		const { email, url } = event.data;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return;

		// When calling from server, url doesn't come complete
		// const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth${url}`;
		const result = await sendPasswordReset({ email: user.email, name: user.name, url });
		return { event, body: result };
	},
);

export default eventPasswordReset;
