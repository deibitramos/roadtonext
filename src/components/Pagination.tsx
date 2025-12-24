import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type PageAndSize = {
	page: number;
	size: number;
};

type Props = {
	pagination: PageAndSize;
	onPagination: (pagination: PageAndSize) => void;
	metadata: {
		count: number;
		hasNextPage: boolean;
	};
};

type SizeButtonProps = { size: string; onValueChange: (value: string) => void };
function SizeButton({ size, onValueChange }: SizeButtonProps) {
	return (
		<Select onValueChange={onValueChange} defaultValue={size}>
			<SelectTrigger className="h-9">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="5">5</SelectItem>
				<SelectItem value="10">10</SelectItem>
				<SelectItem value="25">25</SelectItem>
				<SelectItem value="50">50</SelectItem>
				<SelectItem value="100">100</SelectItem>
			</SelectContent>
		</Select>
	);
}

function Pagination({ pagination, onPagination, metadata }: Props) {
	const startOffset = pagination.page * pagination.size + 1;
	const endOffset = startOffset + pagination.size - 1;
	const actualEndOffset = Math.min(endOffset, metadata.count);
	const { count, hasNextPage } = metadata;
	const label = `${startOffset} - ${actualEndOffset} of ${count}`;

	const handlePreviousPage = () => {
		onPagination({ ...pagination, page: pagination.page - 1 });
	};

	const handleNextPage = () => {
		onPagination({ ...pagination, page: pagination.page + 1 });
	};

	const previousButton = (
		<Button variant="outline" size="sm" disabled={pagination.page < 1} onClick={handlePreviousPage}>
			Previous
		</Button>
	);

	const nextButton = (
		<Button variant="outline" size="sm" disabled={!hasNextPage} onClick={handleNextPage}>
			Next
		</Button>
	);

	const handleChangeSize = (value: string) => {
		onPagination({ page: 0, size: parseInt(value, 10) });
	};

	return (
		<div className="flex justify-between items-center">
			<p className="text-sm text-muted-foreground">{label}</p>
			<div className="flex gap-x-2">
				<SizeButton size={pagination.size.toString()} onValueChange={handleChangeSize} />
				{previousButton}
				{nextButton}
			</div>
		</div>
	);
}

export default Pagination;
