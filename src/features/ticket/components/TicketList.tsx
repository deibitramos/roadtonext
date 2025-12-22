import getTickets from '../queries/getTickets';
import TicketItem from './TicketItem';

type Props = {
	userId?: string;
};

async function TicketList({ userId }: Props) {
	const tickets = await getTickets(userId);

	return (
		<div className="flex flex-1 flex-col items-center gap-y-4 animate-fade-from-top">
			{tickets.map((ticket) => (
				<TicketItem key={ticket.id} ticket={ticket} />
			))}
		</div>
	);
}

export default TicketList;
