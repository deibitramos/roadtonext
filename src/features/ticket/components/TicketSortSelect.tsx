'use client';

import { useQueryStates } from 'nuqs';
import type { SortSelectOption } from '@/components/SortSelect';
import SortSelect from '@/components/SortSelect';
import { sortOptions, sortParser } from '../searchParams';

type Props = {
	options: SortSelectOption[];
};

function TicketSortSelect({ options }: Props) {
	const [sort, setSort] = useQueryStates(sortParser, sortOptions);
	return <SortSelect options={options} value={sort} onChange={setSort} />;
}

export default TicketSortSelect;
