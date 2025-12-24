'use client';

import type { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './ui/input';

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
};

function SearchInput({ value, onChange, placeholder }: Props) {
	const handleSearch = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	}, 250);

	return <Input placeholder={placeholder} onChange={handleSearch} defaultValue={value} />;
}

export default SearchInput;
