import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	emailAndPassword: { enabled: true },
	plugins: [],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
export const { requestPasswordReset, resetPassword } = authClient;
