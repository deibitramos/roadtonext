'use client';

import { useQueryState } from 'nuqs';
import SearchInput from '@/components/SearchInput';
import { searchParser } from '../searchParams';

type Props = {
	placeholder: string;
};

function TicketSearchInput({ placeholder }: Props) {
	const [search, setSearch] = useQueryState('search', searchParser);

	return <SearchInput placeholder={placeholder} value={search} onChange={setSearch} />;
}

export default TicketSearchInput;
