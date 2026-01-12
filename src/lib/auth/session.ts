import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import getUserMembership from '@/features/membership/actions/getUserMembership';
import { auth } from './server';

export const getAuthSession = cache(async () => {
	const userSession = await auth.api.getSession({ headers: await headers() });
	return userSession;
});

export type SessionOptions = {
	skipEmailVerify?: boolean;
	skipHasOrgCheck?: boolean;
	skipActiveOrgCheck?: boolean;
};

export const getSessionUserOrRedirect = cache(async (options: SessionOptions = {}) => {
	const { skipEmailVerify = false, skipHasOrgCheck = false, skipActiveOrgCheck = false } = options;

	const userSession = await getAuthSession();

	if (!userSession) {
		redirect('/sign-in');
	}

	if (!skipEmailVerify && !userSession.user.emailVerified) {
		redirect('/email-verify');
	}

	const { organizations, activeMembershipId } = await getUserMembership(userSession.user.id);
	if (!skipHasOrgCheck && !organizations.length) redirect('/onboarding');
	if (!skipActiveOrgCheck && !activeMembershipId) redirect('/onboarding/select-active');

	return { ...userSession.user, activeMembershipId, organizations };
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
	const { activeMembershipId } = await getUserMembership(session.user.id);
	if (activeMembershipId) redirect('/organization');
});
