import { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import TicketList from '@/features/ticket/components/TicketList';

export default function TicketsPage() {
	return (
		<div className="flex flex-1 flex-col gap-y-8">
			<Heading title="Tickets" description="Your place to manage tickets" />
			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<TicketList />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
