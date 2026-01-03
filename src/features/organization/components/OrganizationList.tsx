import { format } from 'date-fns';
import getOrganizationsByUser from '../queries/getOrganizationsByUser';

async function OrganizationList() {
	const organizations = await getOrganizationsByUser();
	if (!organizations.length) return null;

	return (
		<div className="animate-fade-from-top">
			{organizations.map((organization) => (
				<div key={organization.id}>
					<div>Name: {organization.name}</div>
					<div>Joined at: {format(organization.membershipByUser.joinedAt, 'yyyy-MM-dd HH:mm')}</div>
					<div>Members: {organization._count.memberships}</div>
				</div>
			))}
		</div>
	);
}

export default OrganizationList;
