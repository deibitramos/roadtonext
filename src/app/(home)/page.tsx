import { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Spinner from '@/components/Spinner';
import TicketList from '@/features/ticket/components/TicketList';

export default function HomePage() {
	return (
		<div className="flex flex-1 flex-col gap-y-8">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">All Tickets</h2>
				<p className="text-sm text-muted-foreground">Tickets by everyone at one place</p>
			</div>
			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<TicketList />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
