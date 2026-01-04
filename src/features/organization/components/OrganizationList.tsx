import { format } from 'date-fns';
import { ArrowUpRightFromSquareIcon } from 'lucide-react';
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
import getOrganizationsByUser from '../queries/getOrganizationsByUser';
import OrganizationDeleteButton from './OrganizationDeleteButton';
import OrganizationSwitchButton from './OrganizationSwitchButton';

const headers = ['ID', 'Name', 'Joined At', 'Members', ''].map((header) => (
	<TableHead key={header}>{header}</TableHead>
));

// const actions = [
// 	['switch', ArrowLeftRightIcon] as const,
// 	['open', ArrowUpRightFromSquareIcon] as const,
// 	['edit', PenIcon] as const,
// 	['delete', TrashIcon, 'destructive'] as const,
// ].map(([key, Icon, variant]) => (
// 	<OrganizationButton>

// 	</OrganizationButton>
// ));

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
					return (
						<TableRow key={organization.id}>
							<TableCell>{organization.id}</TableCell>
							<TableCell>{organization.name}</TableCell>
							<TableCell>
								{format(organization.membershipByUser.joinedAt, 'yyyy-MM-dd, HH:mm')}
							</TableCell>
							<TableCell>{organization._count.memberships}</TableCell>
							<TableCell className="flex justify-end gap-x-2">
								<OrganizationSwitchButton
									organizationId={organization.id}
									isActive={organization.membershipByUser.isActive}
									hasActive={hasActive}
								/>
								{protect ? (
									<>
										<Button variant="outline" asChild>
											<Link href={`/organization/${organization.id}/memberships`}>
												<ArrowUpRightFromSquareIcon className="size-4" />
											</Link>
										</Button>
										<MembershipDeleteButton
											userId={organization.membershipByUser.userId}
											organizationId={organization.id}
										/>
										<OrganizationDeleteButton organizationId={organization.id} />
									</>
								) : null}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

export default OrganizationList;
