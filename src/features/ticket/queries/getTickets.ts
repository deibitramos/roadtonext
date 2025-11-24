import { initialTickets } from '@/data';
import { delay } from '@/lib/utils';
import type { Ticket } from '../types';

const getTickets = async (): Promise<Ticket[]> => {
	await delay(2000);
	return new Promise((resolve) => resolve(initialTickets));
};

export default getTickets;
