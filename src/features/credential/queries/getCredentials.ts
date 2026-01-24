import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';
import prisma from '@/lib/prisma';

const getCredentials = async (organizationId: string) => {
	await getAdminOrRedirect(organizationId);

	return await prisma.credential.findMany({
		where: { organizationId },
		select: { id: true, name: true, createdAt: true, lastUsed: true },
	});
};

export default getCredentials;
