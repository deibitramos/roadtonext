import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import sendPasswordReset from '@/features/password/emails/sendPasswordReset';
import prisma from '@/lib/prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'postgresql' }),
	plugins: [nextCookies()],
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,

		sendResetPassword: async ({ user, url }) => {
			// When calling from server, url doesn't come complete
			const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth${url}`;
			console.log('Sending password reset email to:', user.email);
			console.log('Password reset URL:', fullUrl);
			await sendPasswordReset(user, fullUrl);
		},
		onPasswordReset: async ({ user }) => {
			console.log('Password has been reset for user:', user.email);
			return Promise.resolve();
		},
	},
});
