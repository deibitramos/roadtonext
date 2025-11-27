import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
	id: string;
};

function EditButton({ id }: Props) {
	return (
		<Button variant="outline" size="icon" asChild>
			<Link prefetch href={`/tickets/${id}/edit`}>
				<PencilIcon className="h-4 w-4" />
			</Link>
		</Button>
	);
}

export default EditButton;
