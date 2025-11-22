import { initialTickets } from "@/data";

type Props = {
	params: Promise<{ ticketId: string }>;
};

export default async function TicketsPage({ params }: Props) {
	const { ticketId } = await params;
	const ticket = initialTickets.find((t) => t.id === ticketId);
	if (!ticket) {
		return <h1 className="text-6xl">Ticket not found</h1>;
	}
	return (
		<div>
			<h1 className="text-6xl">{ticket.title}</h1>
			<p>{ticket.content}</p>
		</div>
	);
}
