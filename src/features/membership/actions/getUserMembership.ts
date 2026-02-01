import { cache } from 'react';
import prisma from '@/lib/prisma';

const getUserMembership = cache(async (userId: string) => {
	const memberships = await prisma.membership.findMany({
		where: { userId },
		include: { organization: { select: { name: true } } },
	});
	const organizations = memberships.map((m) => ({
		id: m.organizationId,
		name: m.organization.name,
		canDeleteTicket: m.canDeleteTicket,
	}));
	const activeMembershipId = memberships.find((m) => m.isActive)?.organizationId;
	return { organizations, activeMembershipId };
});

export default getUserMembership;
