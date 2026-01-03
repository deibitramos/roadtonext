import prisma from '@/lib/prisma';

const hasMembership = async (userId: string) => {
	const membership = await prisma.membership.findFirst({
		where: { userId },
		select: { userId: true },
	});

	return membership !== null;
};

export default hasMembership;
