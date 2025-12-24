'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export type SortSelectOption = { label: string; sortValue: string; sortKey: string };
type SortObject = Omit<SortSelectOption, 'label'>;

type Props = {
	value: SortObject;
	onChange: (value: SortObject) => void;
	options: SortSelectOption[];
};

function SortSelect({ value, onChange, options }: Props) {
	const handleSort = (compositeKey: string) => {
		const [sortKey, sortValue] = compositeKey.split('_');
		onChange({ sortKey, sortValue });
	};

	return (
		<Select onValueChange={handleSort} defaultValue={`${value.sortKey}_${value.sortValue}`}>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem
						key={option.sortKey + option.sortValue}
						value={`${option.sortKey}_${option.sortValue}`}
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export default SortSelect;
