import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { auth } from './server';

export const getAuthSession = async () => {
	const userSession = await auth.api.getSession({ headers: await headers() });
	return userSession;
};

/* session from middleware shouldn't use cache */
export const getMiddlewareSession = async (request: NextRequest) => {
	const session = await auth.api.getSession({ headers: request.headers });
	return session;
};

export const getSessionUserOrRedirect = async () => {
	const userSession = await getAuthSession();
	if (!userSession) {
		redirect('/sign-in');
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
