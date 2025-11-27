import { notFound } from 'next/navigation';
import CardCompact from '@/components/CardCompact';
import TicketUpsertForm from '@/features/ticket/components/TicketUpsertForm';
import getTicket from '@/features/ticket/queries/getTicket';

type Props = {
	params: Promise<{ ticketId: string }>;
};

export default async function TicketEditPage({ params }: Props) {
	const { ticketId } = await params;
	const ticket = await getTicket(ticketId);

	if (!ticket) {
		notFound();
	}

	return (
		<div className="flex flex-1 flex-col justify-center items-center">
			<CardCompact
				title="Edit Ticket"
				description={`Editing ticket: ${ticket.title}`}
				className="animate-fade-from-top"
			>
				<TicketUpsertForm ticket={ticket} />
			</CardCompact>
		</div>
	);
}
