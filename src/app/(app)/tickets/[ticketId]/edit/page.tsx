import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { type BreadcrumbData, Breadcrumbs } from '@/components/Breadcrumbs';
import CardCompact from '@/components/CardCompact';
import { Separator } from '@/components/ui/separator';
import isOwner from '@/features/auth/utils/isOwner';
import TicketUpsertForm from '@/features/ticket/components/TicketUpsertForm';
import getTicket from '@/features/ticket/queries/getTicket';
import { getSessionUser } from '@/lib/auth/session';

type Props = {
	params: Promise<{ ticketId: string }>;
};

export default async function TicketEditPage({ params }: Props) {
	const { ticketId } = await params;
	const user = await getSessionUser();
	const ticket = await getTicket(ticketId);

	if (!ticket || !isOwner(user, ticket)) {
		notFound();
	}

	const breadcrumbData: BreadcrumbData[] = [
		{ title: 'Tickets', href: '/' },
		{ title: ticket.title, href: `/tickets/${ticket.id}` as Route },
		{ title: 'Edit' },
	];

	return (
		<div className="flex flex-1 flex-col gap-y-8">
			<Breadcrumbs breadcrumbs={breadcrumbData} />
			<Separator />
			<div className="flex flex-1 flex-col justify-center items-center">
				<CardCompact
					title="Edit Ticket"
					description={`Editing ticket: ${ticket.title}`}
					className="animate-fade-from-top"
				>
					<TicketUpsertForm ticket={ticket} />
				</CardCompact>
			</div>
		</div>
	);
}
