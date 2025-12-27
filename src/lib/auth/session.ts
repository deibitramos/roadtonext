import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { auth } from './server';

export const getAuthSession = cache(async () => {
	const userSession = await auth.api.getSession({ headers: await headers() });
	return userSession;
});

export const getSessionUserOrRedirect = async () => {
	const userSession = await getAuthSession();
	if (!userSession) {
		redirect(`/sign-in`);
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
