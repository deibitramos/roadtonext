import { initialTickets } from '@/data';
import { delay } from '@/lib/utils';
import type { Ticket } from '../types';

const getTicket = async (id: string): Promise<Ticket | null> => {
	await delay(2000);
	const ticket = initialTickets.find((t) => t.id === id) || null;
	return new Promise((resolve) => resolve(ticket));
};

export default getTicket;
