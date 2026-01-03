import prisma from '@/lib/prisma';

const hasOneOrganization = async (userId: string) => {
	const organization = await prisma.organization.findFirst({
		where: { memberships: { some: { userId } } },
		select: { id: true },
	});

	return organization !== null;
};

export default hasOneOrganization;
