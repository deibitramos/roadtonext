import { format } from 'date-fns';
import Placeholder from '@/components/Placeholder';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import getInvitations from '../queries/getInvitations';
import InvitationDeleteButton from './InvitationDeleteButton';

type InvitationListProps = {
	organizationId: string;
};

async function InvitationList({ organizationId }: InvitationListProps) {
	const invitations = await getInvitations(organizationId);

	if (!invitations.length) {
		return <Placeholder label="No invitations for this organization" />;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Email</TableHead>
					<TableHead>Invited At</TableHead>
					<TableHead>Invited By</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody>
				{invitations.map((invitation) => {
					return (
						<TableRow key={invitation.id}>
							<TableCell>{invitation.email}</TableCell>
							<TableCell>{format(invitation.createdAt, 'yyyy-MM-dd, HH:mm')}</TableCell>
							<TableCell>
								{invitation.invitedByUser
									? `${invitation.invitedByUser.name} (${invitation.invitedByUser.email})`
									: 'Deleted User'}
							</TableCell>
							<TableCell className="flex justify-end gap-x-2">
								<InvitationDeleteButton id={invitation.id} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

export default InvitationList;
