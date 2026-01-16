import { Suspense } from 'react';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import { InvitationCreateButton } from '@/features/invitation/components/InvitationCreateButton';
import InvitationList from '@/features/invitation/components/InvitationList';
import OrganizationBreadcrumbs from '../../../_navigation/Tabs';

type Props = {
	params: Promise<{ organizationId: string }>;
};

async function InvitationsPage({ params }: Props) {
	const { organizationId } = await params;

	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading
				title="Invitations"
				description="Manage invitations to your organization"
				tabs={<OrganizationBreadcrumbs />}
				actions={<InvitationCreateButton organizationId={organizationId} />}
			/>

			<Suspense fallback={<Spinner />}>
				<InvitationList organizationId={organizationId} />
			</Suspense>
		</div>
	);
}

export default InvitationsPage;
