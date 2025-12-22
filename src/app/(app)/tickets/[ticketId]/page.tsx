import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { type BreadcrumbData, Breadcrumbs } from '@/components/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import TicketItem from '@/features/ticket/components/TicketItem';
import getTicket from '@/features/ticket/queries/getTicket';

type Props = {
	params: Promise<{ ticketId: string }>;
	icon?: ReactElement;
};

export default async function TicketsPage({ params }: Props) {
	const { ticketId } = await params;
	const ticket = await getTicket(ticketId);

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
				<TicketItem ticket={ticket} isDetail />
			</div>
		</div>
	);
}
