import inngest, { organizationCreatedEvent } from '@/lib/inngest';
import prisma from '@/lib/prisma';
import stripe from '@/lib/stripe';

const eventOrganizationCreated = inngest.createFunction(
	{ id: 'organization-created', triggers: [organizationCreatedEvent] },
	async ({ event }) => {
		const { organizationId, byEmail } = event.data;

		const organization = await prisma.organization.findUniqueOrThrow({
			where: { id: organizationId },
			include: { memberships: { include: { user: true } } },
		});

		const stripeCustomer = await stripe.customers.create({
			name: organization.name,
			email: byEmail,
			metadata: { organizationId },
		});

		await prisma.stripeCustomer.create({
			data: { organizationId, customerId: stripeCustomer.id },
		});

		return { event, body: true };
	},
);

export default eventOrganizationCreated;
