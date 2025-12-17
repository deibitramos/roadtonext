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
	['First Ticket', 'first', 'DONE', 49900, 'admin-id'] as const,
	['Second Ticket', 'second', 'OPEN', 39900, 'admin-id'] as const,
	['Third Ticket', 'third', 'IN_PROGRESS', 59900, 'user-id'] as const,
].map(([title, content, status, bounty, userId]) => ({
	...{ title, content: `This is the first ${content} from DB`, status },
	...{ bounty, deadline: new Date().toISOString().split('T')[0], userId },
}));

const seed = async () => {
	const t0 = performance.now();
	console.log('Start seeding...');

	// Clean up existing data
	await prisma.user.deleteMany({});

	// Create data
	await prisma.user.createMany({ data: users });
	await prisma.account.createMany({ data: accounts });
	await prisma.ticket.createMany({ data: tickets });

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
