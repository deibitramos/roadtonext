import { format } from 'date-fns/format';
import { BanIcon, CheckIcon } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import getMemberships from '../queries/getMemberships';
import MembershipDeleteButton from './MembershipDeleteButton';

type Props = {
	organizationId: string;
};

const headers = ['Name', 'Email', 'Joined At', 'Verified Email', ''].map((header) => (
	<TableHead key={header}>{header}</TableHead>
));

async function MembershipList({ organizationId }: Props) {
	const user = await getSessionUserOrRedirect();
	const memberships = await getMemberships(organizationId);

	return (
		<Table>
			<TableHeader>
				<TableRow>{headers}</TableRow>
			</TableHeader>
			<TableBody>
				{memberships.map((membership) => {
					const myself = membership.userId === user.id;
					const buttons = (
						<MembershipDeleteButton
							userId={membership.userId}
							organizationId={organizationId}
							myself={myself}
						/>
					);

					return (
						<TableRow key={membership.userId}>
							<TableCell>{membership.user.name}</TableCell>
							<TableCell>{membership.user.email}</TableCell>
							<TableCell>{format(membership.joinedAt, 'yyyy-MM-dd, HH:mm')}</TableCell>
							<TableCell>{membership.user.emailVerified ? <CheckIcon /> : <BanIcon />}</TableCell>
							<TableCell className="flex justify-end gap-x-2">{buttons}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

export default MembershipList;
