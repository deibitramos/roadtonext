import { CircleCheckIcon, FileTextIcon, PencilIcon } from 'lucide-react';

export const TICKET_STATUS = {
	OPEN: { icon: <FileTextIcon />, label: 'Open' },
	IN_PROGRESS: { icon: <PencilIcon />, label: 'In Progress' },
	DONE: { icon: <CircleCheckIcon />, label: 'Done' },
};
