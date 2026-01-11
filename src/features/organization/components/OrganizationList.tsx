import { format } from 'date-fns';
import { ArrowUpRightFromSquareIcon, PenIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import MembershipDeleteButton from '@/features/membership/components/MembershipDeleteButton';
import MembershipMoreMenu from '@/features/membership/components/MembershipMoreMenu';
import getOrganizationsByUser from '../queries/getOrganizationsByUser';
import OrganizationDeleteButton from './OrganizationDeleteButton';
import OrganizationSwitchButton from './OrganizationSwitchButton';

const headers = ['ID', 'Name', 'Joined At', 'Members', 'My Role', ''].map((header) => (
	<TableHead key={header}>{header}</TableHead>
));

type Props = {
	protect?: boolean;
};

async function OrganizationList({ protect = true }: Props) {
	const organizations = await getOrganizationsByUser(protect);
	const hasActive = organizations.some((org) => org.membershipByUser.isActive);

	return (
		<Table>
			<TableHeader>
				<TableRow>{headers}</TableRow>
			</TableHeader>
			<TableBody>
				{organizations.map((organization) => {
					const isAdmin = organization.membershipByUser.role === 'ADMIN';

					const membershipMoreMenu = (
						<MembershipMoreMenu
							userId={organization.membershipByUser.userId}
							organizationId={organization.id}
							membershipRole={organization.membershipByUser.role}
						/>
					);

					const detailButton = (
						<Button variant="outline" asChild>
							<Link href={`/organization/${organization.id}/memberships`}>
								<ArrowUpRightFromSquareIcon className="size-4" />
							</Link>
						</Button>
					);

					const editButton = (
						<Button variant="outline">
							<PenIcon className="size-4" />
						</Button>
					);

					const leaveButton = (
						<MembershipDeleteButton
							userId={organization.membershipByUser.userId}
							organizationId={organization.id}
							myself={true}
						/>
					);

					const deleteButton = <OrganizationDeleteButton organizationId={organization.id} />;

					const placeholder = <Button size="icon" disabled className="w-10.5 disabled:opacity-0" />;

					return (
						<TableRow key={organization.id}>
							<TableCell>{organization.id}</TableCell>
							<TableCell>{organization.name}</TableCell>
							<TableCell>
								{format(organization.membershipByUser.joinedAt, 'yyyy-MM-dd, HH:mm')}
							</TableCell>
							<TableCell>{organization._count.memberships}</TableCell>
							<TableCell>{organization.membershipByUser.role}</TableCell>
							<TableCell className="flex justify-end gap-x-2">
								<OrganizationSwitchButton
									organizationId={organization.id}
									isActive={organization.membershipByUser.isActive}
									hasActive={hasActive}
								/>
								{protect && isAdmin ? detailButton : placeholder}
								{protect && isAdmin ? membershipMoreMenu : placeholder}
								{protect && isAdmin ? editButton : placeholder}
								{protect ? leaveButton : placeholder}
								{protect && isAdmin ? deleteButton : placeholder}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

export default OrganizationList;
