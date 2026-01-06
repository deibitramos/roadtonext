import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const getOrganizationsByUser = async (protect: boolean) => {
	const user = await getSessionUserOrRedirect(
		protect ? undefined : { skipHasOrgCheck: true, skipActiveOrgCheck: true },
	);

	const organizations = await prisma.organization.findMany({
		where: { memberships: { some: { userId: user.id } } },
		include: {
			memberships: { where: { userId: user.id } },
			_count: { select: { memberships: true } },
		},
		orderBy: { name: 'asc' },
	});

	return organizations.map(({ memberships, ...organization }) => ({
		...organization,
		membershipByUser: memberships[0],
	}));
};

export default getOrganizationsByUser;

export type OrganizationByUser = Awaited<ReturnType<typeof getOrganizationsByUser>>[0];
