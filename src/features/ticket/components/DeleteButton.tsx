import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import deleteTicket from '../actions/deleteTicket';

type Props = {
	id: string;
};

function DeleteButton({ id }: Props) {
	return (
		<form action={deleteTicket.bind(null, id)}>
			<Button variant="outline" size="icon" type="submit">
				<TrashIcon className="h-4 w-4" />
			</Button>
		</form>
	);
}

export default DeleteButton;
