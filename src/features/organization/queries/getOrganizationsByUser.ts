import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const getOrganizationsByUser = async () => {
	const user = await getSessionUserOrRedirect();

	const organizations = await prisma.organization.findMany({
		where: { memberships: { some: { userId: user.id } } },
		include: {
			memberships: { where: { userId: user.id } },
			_count: { select: { memberships: true } },
		},
	});

	return organizations.map(({ memberships, ...organization }) => ({
		...organization,
		membershipByUser: memberships[0],
	}));
};

export default getOrganizationsByUser;

export type OrganizationByUser = Awaited<ReturnType<typeof getOrganizationsByUser>>[0];
