import prisma from '@/lib/prisma';

const getStripeCustomer = async (organizationId: string | undefined) => {
	if (!organizationId) return null;
	const customer = await prisma.stripeCustomer.findUnique({ where: { organizationId } });
	return customer;
};

export default getStripeCustomer;
