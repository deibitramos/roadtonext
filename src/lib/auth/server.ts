import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
import prisma from '@/lib/prisma';
import getBaseUrl from '@/lib/url';
import inngest, { passwordResetEvent, signUpEvent } from '../inngest';

export const auth = betterAuth({
	baseURL: getBaseUrl(),
	database: prismaAdapter(prisma, { provider: 'postgresql' }),
	plugins: [
		nextCookies(),
		emailOTP({
			overrideDefaultEmailVerification: true,
			async sendVerificationOTP(params) {
				const { email, otp, type } = params;
				if (type !== 'email-verification') return;
				await inngest.send(signUpEvent.create({ email, otp }));
			},
		}),
	],
	emailVerification: { sendOnSignUp: true },
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
		sendResetPassword: async ({ user, url }) => {
			await inngest.send(passwordResetEvent.create({ email: user.email, url }));
		},
	},
});
