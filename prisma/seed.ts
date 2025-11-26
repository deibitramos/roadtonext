import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const tickets = [
	{
		title: 'First Ticket',
		content: 'This is the first ticket from DB',
		status: 'DONE' as const,
	},
	{
		title: 'Second Ticket',
		content: 'This is the second ticket from DB',
		status: 'OPEN' as const,
	},
	{
		title: 'Third Ticket',
		content: 'This is the third ticket from DB',
		status: 'IN_PROGRESS' as const,
	},
];

const seed = async () => {
	const t0 = performance.now();
	console.log('Start seeding...');
	await prisma.ticket.deleteMany({});
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
