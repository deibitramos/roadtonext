import { emailOTPClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	emailAndPassword: { enabled: true },
	plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
export const { requestPasswordReset, resetPassword, changePassword } = authClient;
export const { emailOtp } = authClient;
