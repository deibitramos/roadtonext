import { cache } from 'react';
import prisma from '@/lib/prisma';

const getUserMembership = cache(async (userId: string) => {
	const memberships = await prisma.membership.findMany({ where: { userId } });
	const organizations = memberships.map((m) => ({
		id: m.organizationId,
		canDeleteTicket: m.canDeleteTicket,
	}));
	const activeMembershipId = memberships.find((m) => m.isActive)?.organizationId;
	return { organizations, activeMembershipId };
});

export default getUserMembership;
