import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Ticket } from '@/generated/prisma/client';
import { cn } from '@/lib/utils';
import { TICKET_ICONS } from '../constants';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import GoToTicketButton from './GoToTicketButton';

type Props = {
	ticket: Ticket;
	isDetail?: boolean;
};

function TicketItem({ ticket, isDetail = false }: Props) {
	return (
		<div
			className={cn('w-full flex gap-x-1', {
				'max-w-[580px]': isDetail,
				'max-w-[420px]': !isDetail,
			})}
		>
			<Card key={ticket.id} className="w-full">
				<CardHeader>
					<CardTitle className="flex gap-x-2 font-bold items-center">
						<span>{TICKET_ICONS[ticket.status]}</span>
						<span className="truncate">{ticket.title}</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<span className={cn('whitespace-break-spaces', { 'line-clamp-3': !isDetail })}>
						{ticket.content}
					</span>
				</CardContent>
			</Card>
			<div className="flex flex-col gap-y-1">
				{!isDetail && <GoToTicketButton id={ticket.id} />}
				<EditButton id={ticket.id} />
				{isDetail && <DeleteButton id={ticket.id} />}
			</div>
		</div>
	);
}

export default TicketItem;
