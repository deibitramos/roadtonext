import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { cache } from 'react';
import { auth } from './server';

export type SessionOptions = {
	checkEmailVerified?: boolean;
};

export const getAuthSession = cache(async () => {
	const userSession = await auth.api.getSession({ headers: await headers() });
	return userSession;
});

/* session from middleware shouldn't use cache */
export const getMiddlewareSession = async (request: NextRequest) => {
	const session = await auth.api.getSession({ headers: request.headers });
	return session;
};

export const getSessionUserOrRedirect = async (options: SessionOptions = {}) => {
	const { checkEmailVerified = true } = options;
	const userSession = await getAuthSession();
	if (!userSession) {
		redirect('/sign-in');
	}
	// Redirect unverified users to verification page (unless checkEmailVerified is false).
	// Pass { checkEmailVerified: false } when you need the user but don't want to redirect
	// unverified users (e.g., on the email-verify page itself or in server actions).
	if (checkEmailVerified && !userSession.user.emailVerified) {
		redirect('/email-verify');
	}
	return userSession.user;
};

export const getSessionUserOrUndefined = async () => {
	const userSession = await getAuthSession();
	return userSession?.user;
};

export const isAuthenticated = async () => {
	const userSession = await getAuthSession();
	return !!userSession;
};
