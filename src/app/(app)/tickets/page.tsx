import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import CardCompact from '@/components/CardCompact';
import ErrorBoundary from '@/components/ErrorBoundary';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import TicketList from '@/features/ticket/components/TicketList';
import TicketUpsertForm from '@/features/ticket/components/TicketUpsertForm';
import { searchParamsCache } from '@/features/ticket/searchParams';
import { getSessionUser } from '@/lib/auth/session';

type Props = {
	searchParams: Promise<SearchParams>;
};

export default async function TicketsPage({ searchParams }: Props) {
	const user = await getSessionUser();
	const params = await searchParams;
	return (
		<div className="flex flex-1 flex-col gap-y-8">
			<Heading title="My Tickets" description="All your tickets at one place" />
			<CardCompact
				title="Create Ticket"
				description="A new ticket will be created"
				className="w-full max-w-105 self-center"
			>
				<TicketUpsertForm />
			</CardCompact>
			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<TicketList userId={user.id} searchParams={searchParamsCache.parse(params)} />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
