import Link from 'next/link';
import type { ReactElement } from 'react';
import Placeholder from '@/components/Placeholder';
import { Button } from '@/components/ui/button';
import { initialTickets } from '@/data';
import TicketItem from '@/features/ticket/components/TicketItem';

type Props = {
	params: Promise<{ ticketId: string }>;
	icon?: ReactElement;
};

export default async function TicketsPage({ params }: Props) {
	const { ticketId } = await params;
	const ticket = initialTickets.find((t) => t.id === ticketId);
	if (!ticket) {
		return (
			<Placeholder label="Ticket not found">
				<Button asChild variant="outline">
					<Link href="/tickets">Go back</Link>
				</Button>
			</Placeholder>
		);
	}
	return (
		<div className="flex justify-center animate-fade-from-top">
			<TicketItem ticket={ticket} isDetail />
		</div>
	);
}
