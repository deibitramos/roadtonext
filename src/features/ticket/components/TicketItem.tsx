import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toCurrencyFromCent } from '@/utils/currency';
import { TICKET_STATUS } from '../constants';
import type { TicketWithUser } from '../queries/getTicket';
import EditButton from './EditButton';
import GoToTicketButton from './GoToTicketButton';
import TicketMoreMenu from './TicketMoreMenu';

type Props = {
	ticket: TicketWithUser;
	isDetail?: boolean;
};

function TicketItem({ ticket, isDetail = false }: Props) {
	return (
		<div className={cn('w-full flex gap-x-1', { 'max-w-145': isDetail, 'max-w-105': !isDetail })}>
			<Card key={ticket.id} className="w-full">
				<CardHeader>
					<CardTitle className="flex gap-x-2 font-bold items-center">
						<span>{TICKET_STATUS[ticket.status].icon}</span>
						<span className="truncate">{ticket.title}</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<span className={cn('whitespace-break-spaces', { 'line-clamp-3': !isDetail })}>
						{ticket.content}
					</span>
				</CardContent>
				<CardFooter className="flex justify-between">
					<p className="text-sm text-muted-foreground">
						Deadline: {ticket.deadline} by {ticket.user.name}
					</p>
					<p className="text-sm text-muted-foreground">
						Bounty: {toCurrencyFromCent(ticket.bounty)}
					</p>
				</CardFooter>
			</Card>
			<div className="flex flex-col gap-y-1">
				{!isDetail && <GoToTicketButton id={ticket.id} />}
				<EditButton id={ticket.id} />
				{isDetail && <TicketMoreMenu ticket={ticket} />}
			</div>
		</div>
	);
}

export default TicketItem;
