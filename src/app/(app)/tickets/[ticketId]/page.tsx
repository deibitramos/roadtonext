import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import TicketItem from '@/features/ticket/components/TicketItem';
import getTicket from '@/features/ticket/queries/getTicket';

type Props = {
	params: Promise<{ ticketId: string }>;
	icon?: ReactElement;
};

export default async function TicketsPage({ params }: Props) {
	const { ticketId } = await params;
	const ticket = await getTicket(ticketId);

	if (!ticket) {
		notFound();
	}

	return (
		<div className="flex justify-center animate-fade-from-top">
			<TicketItem ticket={ticket} isDetail />
		</div>
	);
}
