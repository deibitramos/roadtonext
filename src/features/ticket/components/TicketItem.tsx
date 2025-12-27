import { Suspense } from 'react';
import SkeletonLoader from '@/components/SkeletonLoader';
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
	children?: React.ReactNode;
};

function TicketItem({ ticket, isDetail = false, children }: Props) {
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
					{ticket.owner && <EditButton id={ticket.id} />}
					{ticket.owner && isDetail && <TicketMoreMenu ticket={ticket} />}
				</div>
			</div>
			{isDetail ? <Suspense fallback={<SkeletonLoader />}>{children}</Suspense> : null}
		</div>
	);
}

export default TicketItem;
