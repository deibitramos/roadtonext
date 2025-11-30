'use client';

import { MoreVerticalIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Ticket } from '@/generated/prisma/client';
import { getKeys } from '@/lib/utils';
import deleteTicket from '../actions/deleteTicket';
import updateTicketStatus from '../actions/updateTicketStatus';
import { TICKET_STATUS } from '../constants';

type Props = {
	ticket: Ticket;
};

function TicketMoreMenu({ ticket }: Props) {
	const [open, setIsOpen] = useState(false);

	const onUpdateStatus = async (value: string) => {
		const promise = updateTicketStatus(ticket.id, value as typeof ticket.status);
		toast.promise(promise, { loading: 'Updating status...' });
		const result = await promise;

		if (result.status === 'ERROR') {
			toast.error(result.message);
			return;
		}
		toast.success(result.message);
	};

	const onSelectDelete = () => {
		setIsOpen(true);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<MoreVerticalIcon className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuRadioGroup value={ticket.status} onValueChange={onUpdateStatus}>
						{getKeys(TICKET_STATUS).map((key) => (
							<DropdownMenuRadioItem key={key} value={key}>
								{TICKET_STATUS[key].label}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={onSelectDelete}>
						<TrashIcon className="h-4 w-4" />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<ConfirmDialog
				open={open}
				onOpenChange={setIsOpen}
				action={deleteTicket.bind(null, ticket.id)}
			/>
		</>
	);
}

export default TicketMoreMenu;
