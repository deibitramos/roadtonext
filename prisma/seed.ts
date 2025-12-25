import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const asdasd =
	'244e9f59dd921ab735f56d94964dddc6:b2d8bf9eb91adcb5ce3ae3dbc0403afcefa30a77dc10954b7d979cbb1b13bf78dd575c619447a73c85c8b5389728cfdf3257895917d131f4ed780324e4c52c95';

const users = [
	['admin-id', 'Admin', 'admin@admin.com', true] as const,
	['user-id', 'User', 'davidramos.13@outlook.com', true] as const,
].map(([id, name, email, emailVerified]) => ({ id, name, email, emailVerified }));

const accounts = [
	['admin-account-id', 'credential', 'admin-id', asdasd] as const,
	['user-account-id', 'credential', 'user-id', asdasd] as const,
].map(([id, providerId, userId, password]) => {
	return { id, accountId: id, providerId, userId, password };
});

const tickets = [
	['ticket-1', 'First Ticket', 'first', 'DONE', 49900, 'admin-id'] as const,
	['ticket-2', 'Second Ticket', 'second', 'OPEN', 39900, 'admin-id'] as const,
	['ticket-3', 'Third Ticket', 'third', 'IN_PROGRESS', 59900, 'user-id'] as const,
].map(([id, title, content, status, bounty, userId]) => ({
	...{ id, title, content: `This is the first ${content} from DB`, status },
	...{ bounty, deadline: new Date().toISOString().split('T')[0], userId },
}));

const comments = [
	['Great work on this ticket!', 'ticket-1', 'user-id'] as const,
	['Thanks for the feedback!', 'ticket-1', 'admin-id'] as const,
	['I need more information about this.', 'ticket-2', 'user-id'] as const,
	['Sure, what do you need?', 'ticket-2', 'admin-id'] as const,
	['This is taking longer than expected.', 'ticket-2', 'user-id'] as const,
].map(([content, ticketId, userId]) => ({ content, ticketId, userId }));

const seed = async () => {
	const t0 = performance.now();
	console.log('Start seeding...');

	// Clean up existing data
	await prisma.user.deleteMany({});

	// Create data
	await prisma.user.createMany({ data: users });
	await prisma.account.createMany({ data: accounts });
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
