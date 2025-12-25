import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import isOwner from '@/features/auth/utils/isOwner';
import Comments from '@/features/comment/components/Comments';
import { getAuthSession } from '@/lib/auth/session';
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

async function TicketItem({ ticket, isDetail = false }: Props) {
	const auth = await getAuthSession();
	const isTicketOwner = isOwner(auth?.user, ticket);

	return (
		<div
			className={cn('w-full flex flex-col gap-y-4', {
				'max-w-145': isDetail,
				'max-w-105': !isDetail,
			})}
		>
			<div className="flex gap-x-2">
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
					{isTicketOwner && <EditButton id={ticket.id} />}
					{isTicketOwner && isDetail && <TicketMoreMenu ticket={ticket} />}
				</div>
			</div>
			{isDetail ? <Comments ticketId={ticket.id} /> : null}
		</div>
	);
}

export default TicketItem;
