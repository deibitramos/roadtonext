import { Suspense } from 'react';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import InvitationCreateButton from '@/features/invitation/components/InvitationCreateButton';
import MembershipList from '@/features/membership/components/MembershipList';
import OrganizationBreadcrumbs from '../../../_navigation/Tabs';

type Props = {
	params: Promise<{ organizationId: string }>;
};

async function MembershipsPage({ params }: Props) {
	const { organizationId } = await params;

	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading
				title="Memberships"
				description="Manage members in your organization"
				tabs={<OrganizationBreadcrumbs />}
				actions={<InvitationCreateButton organizationId={organizationId} />}
			/>

			<Suspense fallback={<Spinner />}>
				<MembershipList organizationId={organizationId} />
			</Suspense>
		</div>
	);
}

export default MembershipsPage;
