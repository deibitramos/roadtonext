'use server';

import type { Route } from 'next';
import { redirect } from 'next/navigation';
import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';
import prisma from '@/lib/prisma';
import stripe from '@/lib/stripe';
import { actionError } from '@/lib/types';
import getBaseUrl from '@/lib/url';

const createCheckoutSession = async (organizationId: string | undefined, priceId: string) => {
	if (!organizationId) redirect('/sign-in');

	await getAdminOrRedirect(organizationId);
	const stripeCustomer = await prisma.stripeCustomer.findUnique({ where: { organizationId } });
	if (!stripeCustomer) return actionError('Stripe customer not found');

	const price = await stripe.prices.retrieve(priceId);

	const session = await stripe.checkout.sessions.create({
		billing_address_collection: 'auto',
		line_items: [{ price: price.id, quantity: 1 }],
		customer: stripeCustomer.customerId,
		mode: 'subscription',
		success_url: `${getBaseUrl()}/organization/${organizationId}/subscription`,
		cancel_url: `${getBaseUrl()}/pricing`,
		metadata: { organizationId },
		subscription_data: { metadata: { organizationId } },
	});

	if (!session.url) {
		return actionError('Session URL could not be created');
	}

	redirect(session.url as Route);
};

export default createCheckoutSession;
