import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import CardCompact from '@/components/CardCompact';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import TicketList from '@/features/ticket/components/TicketList';
import TicketUpsertForm from '@/features/ticket/components/TicketUpsertForm';
import { searchParamsCache } from '@/features/ticket/searchParams';

type Props = {
	searchParams: Promise<SearchParams>;
};

async function TicketsByOrganizationPage({ searchParams }: Props) {
	const params = await searchParams;
	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading title="Our Tickets" description="All tickets related to my organization" />

			<CardCompact
				title="Create Ticket"
				description="A new ticket will be created"
				className="w-full max-w-105 self-center"
			>
				<TicketUpsertForm />
			</CardCompact>

			<Suspense fallback={<Spinner />}>
				<TicketList byOrganization searchParams={searchParamsCache.parse(params)} />
			</Suspense>
		</div>
	);
}

export default TicketsByOrganizationPage;
