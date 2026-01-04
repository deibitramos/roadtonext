import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const TESTPWD =
	'244e9f59dd921ab735f56d94964dddc6:b2d8bf9eb91adcb5ce3ae3dbc0403afcefa30a77dc10954b7d979cbb1b13bf78dd575c619447a73c85c8b5389728cfdf3257895917d131f4ed780324e4c52c95';

const TODAY_DATE = new Date().toISOString().split('T')[0];

const users = [
	['admin-id', 'Admin', 'admin@deibit.dev', true] as const,
	['user-id', 'User', 'davidramos.13@outlook.com', true] as const,
	['alice-id', 'Alice', 'alice@deibit.dev', true] as const,
	['bob-id', 'Bob', 'bob@deibit.dev', true] as const,
	['charlie-id', 'Charlie', 'charlie@deibit.dev', true] as const,
	['jose-id', 'Jose', 'jose@deibit.dev', true] as const,
].map(([id, name, email, emailVerified]) => ({ id, name, email, emailVerified }));

const accounts = [
	['admin-acc-id', 'credential', 'admin-id', TESTPWD] as const,
	['user-acc-id', 'credential', 'user-id', TESTPWD] as const,
	['alice-acc-id', 'credential', 'alice-id', TESTPWD] as const,
	['bob-acc-id', 'credential', 'bob-id', TESTPWD] as const,
	['charlie-acc-id', 'credential', 'charlie-id', TESTPWD] as const,
	['jose-acc-id', 'credential', 'jose-id', TESTPWD] as const,
].map(([id, providerId, userId, password]) => {
	return { id, accountId: id, providerId, userId, password };
});

const organizations = [
	['org-1-id', 'Acme Corporation'] as const,
	['org-2-id', 'Tech Innovators'] as const,
].map(([id, name]) => ({ id, name }));

const memberships = [
	['admin-id', 'org-1-id', 172800, true] as const, // Admin in Acme (active)
	['admin-id', 'org-2-id', 86400, false] as const, // Admin in Tech Innovators (inactive)
	['user-id', 'org-1-id', 86400, true] as const, // User in Acme (active)
	['alice-id', 'org-1-id', 43200, true] as const, // Alice in Acme (active)
	['alice-id', 'org-2-id', 21600, false] as const, // Alice in Tech Innovators (inactive)
	['bob-id', 'org-2-id', 43200, true] as const, // Bob in Tech Innovators (active)
	['charlie-id', 'org-1-id', 7200, true] as const, // Charlie in Acme (active)
].map(([userId, organizationId, secondsAgo, isActive]) => ({
	...{ userId, organizationId },
	...{ joinedAt: new Date(Date.now() - secondsAgo * 1000), isActive },
}));

const tickets = [
	['ticket-1', 'First Ticket', 'first', 'DONE', 49900, 'admin-id', 86400] as const,
	['ticket-2', 'Second Ticket', 'second', 'OPEN', 39900, 'admin-id', 43200] as const,
	['ticket-3', 'Third Ticket', 'third', 'IN_PROGRESS', 59900, 'user-id', 7200] as const,
	['ticket-4', 'Fourth Ticket', 'fourth', 'OPEN', 29900, 'alice-id', 21600] as const,
	['ticket-5', 'Fifth Ticket', 'fifth', 'IN_PROGRESS', 69900, 'bob-id', 14400] as const,
].map(([id, title, content, status, bounty, userId, secondsAgo]) => ({
	...{ id, title, content: `This is the first ${content} from DB`, status },
	...{ bounty, deadline: TODAY_DATE, userId, createdAt: new Date(Date.now() - secondsAgo * 1000) },
}));

const comments = [
	['Great work on this ticket!', 'ticket-1', 'user-id', 82800] as const,
	['Thanks for the feedback!', 'ticket-1', 'admin-id', 79200] as const,
	['I need more information about this.', 'ticket-2', 'user-id', 39600] as const,
	['Sure, what do you need?', 'ticket-2', 'admin-id', 36000] as const,
	['This is taking longer than expected.', 'ticket-2', 'user-id', 3600] as const,
	['Looking good so far!', 'ticket-3', 'alice-id', 5400] as const,
	['Can someone review this?', 'ticket-4', 'charlie-id', 18000] as const,
	['I will take a look.', 'ticket-4', 'admin-id', 10800] as const,
	['Working on it now.', 'ticket-5', 'bob-id', 7200] as const,
].map(([content, ticketId, userId, secondsAgo]) => ({
	...{ content, ticketId, userId },
	createdAt: new Date(Date.now() - secondsAgo * 1000),
}));

const seed = async () => {
	const t0 = performance.now();
	console.log('Start seeding...');

	// Clean up existing data
	await prisma.user.deleteMany({});
	await prisma.organization.deleteMany({});

	// Create data
	await prisma.user.createMany({ data: users });
	await prisma.account.createMany({ data: accounts });
	await prisma.organization.createMany({ data: organizations });
	await prisma.membership.createMany({ data: memberships });
	await prisma.ticket.createMany({ data: tickets });
	await prisma.comment.createMany({ data: comments });

	const t1 = performance.now();
	console.log(`Seeding finished. Took ${(t1 - t0).toFixed(2)} milliseconds.`);
};

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
