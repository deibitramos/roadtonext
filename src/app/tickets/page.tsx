import { Suspense } from 'react';
import CardCompact from '@/components/CardCompact';
import ErrorBoundary from '@/components/ErrorBoundary';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import TicketList from '@/features/ticket/components/TicketList';
import TicketUpsertForm from '@/features/ticket/components/TicketUpsertForm';

export default function TicketsPage() {
	return (
		<div className="flex flex-1 flex-col gap-y-8">
			<Heading title="Tickets" description="Your place to manage tickets" />
			<CardCompact title="Create Ticket" description="A new ticket will be created">
				<TicketUpsertForm />
			</CardCompact>
			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<TicketList />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
