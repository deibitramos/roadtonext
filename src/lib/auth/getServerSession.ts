import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { auth } from './server';

const getServerSession = cache(async () => {
	const userSession = await auth.api.getSession({ headers: await headers() });
	if (!userSession) {
		redirect(`/sign-in`);
	}
	return userSession;
});

export default getServerSession;
