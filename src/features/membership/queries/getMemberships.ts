import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const getMemberships = async (organizationId: string) => {
	await getSessionUserOrRedirect();

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
