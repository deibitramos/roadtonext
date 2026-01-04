import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import hasMembership from '@/features/organization/queries/hasMembership';
import { auth } from './server';

export const getAuthSession = cache(async () => {
	const userSession = await auth.api.getSession({ headers: await headers() });
	return userSession;
});

export type SessionOptions = {
	skipEmailVerification?: boolean;
	skipOrganizationCheck?: boolean;
	skipActiveOrganizationCheck?: boolean;
};

export const getSessionUserOrRedirect = cache(async (options?: SessionOptions) => {
	const userSession = await getAuthSession();

	if (!userSession) {
		redirect('/sign-in');
	}

	if (!options?.skipEmailVerification && !userSession.user.emailVerified) {
		redirect('/email-verify');
	}

	if (!options?.skipOrganizationCheck || !options?.skipActiveOrganizationCheck) {
		const membership = await hasMembership(userSession.user.id);
		if (!options?.skipOrganizationCheck && !membership.hasMembership) redirect('/onboarding');
		if (!options?.skipActiveOrganizationCheck && !membership.isActive)
			redirect('/onboarding/select-active');
	}

	return userSession.user;
});

export const getSessionUserOrUndefined = cache(async () => {
	const userSession = await getAuthSession();
	return userSession?.user;
});

export const isAuthenticated = cache(async () => {
	const userSession = await getAuthSession();
	return !!userSession;
});

export const redirectIfAuthenticated = cache(async () => {
	const session = await getAuthSession();
	if (session) redirect('/tickets');
});

export const redirectIfHasActiveOrganization = cache(async () => {
	const session = await getAuthSession();
	if (!session?.user) return;
	const membership = await hasMembership(session.user.id);
	if (membership.isActive) redirect('/organization');
});
