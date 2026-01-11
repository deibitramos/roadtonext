import { cache } from 'react';
import prisma from '@/lib/prisma';

const hasMembership = cache(async (userId: string) => {
	const memberships = await prisma.membership.findMany({ where: { userId } });
	return {
		hasMembership: memberships.length > 0,
		activeMembershipId: memberships.find((m) => m.isActive)?.organizationId,
	};
});

export default hasMembership;
