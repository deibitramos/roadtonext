import type Stripe from 'stripe';
import * as stripeData from '../data';

export const onSubscriptionUpdated = async (subscription: Stripe.Subscription) => {
	await stripeData.updateStripeCustomer(subscription);
};
