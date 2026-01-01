import { emailOTPClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
	baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
	emailAndPassword: { enabled: true },
	plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
export const { requestPasswordReset, resetPassword, changePassword } = authClient;
export const { emailOtp } = authClient;
