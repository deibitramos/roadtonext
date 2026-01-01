import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
import prisma from '@/lib/prisma';
import inngest from '../inngest';

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'postgresql' }),
	plugins: [
		nextCookies(),
		emailOTP({
			overrideDefaultEmailVerification: true,
			async sendVerificationOTP(params) {
				const { email, otp, type } = params;
				console.log('params', params);
				if (type !== 'email-verification') return;
				console.log('inside sendVerificationOTP', email, otp);
				await inngest.send({ name: 'app/auth.sign-up', data: { email, otp } });
			},
		}),
	],
	emailVerification: { sendOnSignUp: true },
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
		sendResetPassword: async ({ user, url }) => {
			console.log('inside sendresetpassword', user, url);
			await inngest.send({ name: 'app/password.password-reset', data: { email: user.email, url } });
		},
	},
});
