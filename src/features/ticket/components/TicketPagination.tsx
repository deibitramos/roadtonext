'use client';

import { useQueryState, useQueryStates } from 'nuqs';
import { useEffect, useRef } from 'react';
import Pagination, { type PaginationMetadata } from '@/components/Pagination';
import { paginationOptions, paginationParser, searchParser } from '../searchParams';

type Props = {
	metadata: PaginationMetadata;
};

function TicketPagination({ metadata }: Props) {
	const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions);
	const [search] = useQueryState('search', searchParser);
	const prevSearch = useRef(search);

	useEffect(() => {
		if (search === prevSearch.current) return;
		setPagination({ ...pagination, page: 0 });
		prevSearch.current = search;
	}, [search, pagination, setPagination]);

	return <Pagination pagination={pagination} onPagination={setPagination} metadata={metadata} />;
}

export default TicketPagination;
