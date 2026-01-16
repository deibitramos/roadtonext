import { emailOTPClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import getBaseUrl from '@/utils/url';

const authClient = createAuthClient({
	baseURL: getBaseUrl(),
	emailAndPassword: { enabled: true },
	plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
export const { requestPasswordReset, resetPassword, changePassword } = authClient;
export const { emailOtp } = authClient;
