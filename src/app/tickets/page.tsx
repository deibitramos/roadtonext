import Heading from '@/components/Heading';
import { initialTickets } from '@/data';
import TicketItem from '@/features/ticket/components/TicketItem';

export default function TicketsPage() {
	return (
		<div className="flex flex-1 flex-col gap-y-8">
			<Heading title="Tickets" description="Your place to manage tickets" />
			<div className="flex flex-1 flex-col items-center gap-y-4 animate-fade-from-top">
				{initialTickets.map((ticket) => (
					<TicketItem key={ticket.id} ticket={ticket} />
				))}
			</div>
		</div>
	);
}
