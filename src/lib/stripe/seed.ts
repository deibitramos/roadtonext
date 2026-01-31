import 'dotenv/config';
import prisma from '@/lib/prisma';
import stripe from '@/lib/stripe';

const getFeatures = (text: string) => ({
	marketing_features: [{ name: 'Cancel anytime' }, { name: text }],
});

const productData = [
	['Business Plan', 'Your business plan.', 999, 'Unlimited members'] as const,
	['Startup Plan', 'Your startup plan.', 3, 'Up to 3 members'] as const,
].map(([name, description, allowedMembers, specificFeature]) => ({
	...{ name, description, metadata: { allowedMembers }, ...getFeatures(specificFeature) },
}));

const priceData = [
	[1, 19999, 'year'] as const, // Startup Plan yearly
	[1, 1999, 'month'] as const, // Startup Plan monthly
	[0, 39999, 'year'] as const, // Business Plan yearly
	[0, 3999, 'month'] as const, // Business Plan monthly
].map(([productIndex, unit_amount, interval]) => ({
	...{ productIndex, unit_amount, currency: 'usd', recurring: { interval } },
}));

const seed = async () => {
	const t0 = performance.now();
	console.log('Stripe Seed: Started ...');

	// clean up

	const prices = await stripe.prices.list();
	const products = await stripe.products.list();
	const customers = await stripe.customers.list();

	for (const price of prices.data) {
		await stripe.prices.update(price.id, { active: false });
	}
	for (const product of products.data) {
		await stripe.products.update(product.id, { active: false });
	}
	for (const customer of customers.data) {
		await stripe.customers.del(customer.id);
	}
	await prisma.stripeCustomer.deleteMany({});

	// seed
	const organizations = await prisma.organization.findMany({
		include: { memberships: { include: { user: true } } },
	});

	const testClock = await stripe.testHelpers.testClocks.create({
		frozen_time: Math.round(Date.now() / 1000),
	});

	for (const organization of organizations) {
		const firstMembership = organization.memberships[0];
		if (!firstMembership) {
			console.warn(`Skipping organization ${organization.id} - no memberships found`);
			continue;
		}

		const customer = await stripe.customers.create({
			name: organization.name,
			email: firstMembership.user.email,
			test_clock: testClock.id,
		});

		await prisma.stripeCustomer.create({
			data: { customerId: customer.id, organizationId: organization.id },
		});
	}

	const createdProducts = await Promise.all(
		productData.map((product) => stripe.products.create({ ...product })),
	);

	await Promise.all(
		priceData.map((price) => {
			const { productIndex, ...stripePriceData } = price;
			return stripe.prices.create({
				product: createdProducts[productIndex].id,
				...stripePriceData,
			});
		}),
	);

	const t1 = performance.now();
	console.log(`Stripe Seed: Finished (${t1 - t0}ms)`);
};

seed();
