import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { type BreadcrumbData, Breadcrumbs } from '@/components/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import Attachments from '@/features/attachments/components/Attachments';
import Comments from '@/features/comment/components/Comments';
import getComments from '@/features/comment/queries/getComments';
import TicketItem from '@/features/ticket/components/TicketItem';
import getTicket from '@/features/ticket/queries/getTicket';

type Props = {
	params: Promise<{ ticketId: string }>;
	icon?: ReactElement;
};

export default async function TicketPage({ params }: Props) {
	const { ticketId } = await params;
	const [ticket, paginatedComments] = await Promise.all([
		getTicket(ticketId),
		getComments(ticketId),
	]);

	if (!ticket) {
		notFound();
	}

	const breadcrumbData: BreadcrumbData[] = [
		{ title: 'Tickets', href: '/' },
		{ title: ticket.title },
	];

	return (
		<div className="flex flex-1 flex-col gap-y-8">
			<Breadcrumbs breadcrumbs={breadcrumbData} />
			<Separator />
			<div className="flex justify-center animate-fade-from-top">
				<TicketItem ticket={ticket} isDetail>
					<Attachments ticketId={ticket.id} owner={ticket.owner} />
					<Comments paginatedComments={paginatedComments} ticketId={ticket.id} key={ticket.id} />
				</TicketItem>
			</div>
		</div>
	);
}
