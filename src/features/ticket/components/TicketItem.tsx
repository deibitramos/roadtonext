import { SquareArrowOutUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TICKET_ICONS } from '../constants';
import type { Ticket } from '../types';

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
			{isDetail ? null : (
				<div className="flex flex-col gap-y-1">
					<Button variant="outline" size="icon" asChild>
						<Link href={`/tickets/${ticket.id}`}>
							<SquareArrowOutUpRightIcon className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
}

export default TicketItem;
