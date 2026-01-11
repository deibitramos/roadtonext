import prisma from '@/lib/prisma';
import getAdminOrRedirect from './getAdminOrRedirect';

const getMemberships = async (organizationId: string) => {
	await getAdminOrRedirect(organizationId);

	return await prisma.membership.findMany({
		where: { organizationId },
		include: {
			user: {
				select: { email: true, name: true, emailVerified: true },
			},
		},
	});
};

export default getMemberships;

export type MembershipWithUser = Awaited<ReturnType<typeof getMemberships>>[number];
