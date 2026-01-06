import { redirect } from 'next/navigation';
import { cache } from 'react';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const getAdminOrRedirect = cache(async (organizationId: string) => {
	const user = await getSessionUserOrRedirect();
	const membership = await prisma.membership.findUnique({
		where: { userId_organizationId: { userId: user.id, organizationId }, role: 'ADMIN' },
	});

	if (!membership) redirect('/sign-in');
	return user;
});

export default getAdminOrRedirect;
