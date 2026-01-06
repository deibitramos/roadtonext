import Placeholder from '@/components/Placeholder';
import getTickets from '../queries/getTickets';
import type { ParsedSearchParams } from '../searchParams';
import TicketItem from './TicketItem';
import TicketPagination from './TicketPagination';
import TicketSearchInput from './TicketSearchInput';
import TicketSortSelect from './TicketSortSelect';

type Props = {
	userId?: string;
	searchParams: ParsedSearchParams;
	byOrganization?: boolean;
};

const sortOptions = [
	{ label: 'Newest', sortKey: 'createdAt', sortValue: 'desc' },
	{ label: 'Oldest', sortKey: 'createdAt', sortValue: 'asc' },
	{ label: 'Bounty', sortKey: 'bounty', sortValue: 'desc' },
];

async function TicketList({ userId, searchParams, byOrganization = false }: Props) {
	const result = await getTickets(userId, searchParams, byOrganization);
	const { list: tickets, metadata: ticketMetadata } = result;

	return (
		<div className="flex flex-1 flex-col items-center gap-y-4 animate-fade-from-top">
			<div className="w-full max-w-105 flex gap-x-2">
				<TicketSearchInput placeholder="Search tickets..." />
				<TicketSortSelect options={sortOptions} />
			</div>
			{tickets.length ? (
				tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
			) : (
				<Placeholder label="No tickets found" />
			)}
			<div className="w-full max-w-105">
				<TicketPagination metadata={ticketMetadata} />
			</div>
		</div>
	);
}

export default TicketList;
