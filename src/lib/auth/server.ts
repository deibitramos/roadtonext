import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import prisma from '@/lib/prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'postgresql' }),
	plugins: [nextCookies()],
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
		sendResetPassword: async ({ user, url, token }) => {
			console.log('Reset password for user:', user.email);
			console.log('Reset URL:', url);
			console.log('Reset Token:', token);
			// Here you would integrate with your email service to send the email
			// e.g., using nodemailer, SendGrid, etc.
			// For this example, we'll just log the information to the console.
			return Promise.resolve();
		},
		onPasswordReset: async ({ user }) => {
			console.log('Password has been reset for user:', user.email);
			return Promise.resolve();
		},
	},
});
