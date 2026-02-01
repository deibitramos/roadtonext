import type Stripe from 'stripe';
import prisma from '@/lib/prisma';

const updateStripeCustomer = async (subscription: Stripe.Subscription) => {
	await prisma.stripeCustomer.update({
		where: { customerId: subscription.customer as string },
		data: {
			subscriptionId: subscription.id,
			subscriptionStatus: subscription.status,
			productId: subscription.items.data[0].price.product as string,
			priceId: subscription.items.data[0].price.id as string,
		},
	});
};

export default updateStripeCustomer;
