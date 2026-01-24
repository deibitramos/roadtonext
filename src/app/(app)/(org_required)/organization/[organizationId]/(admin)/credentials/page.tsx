import { Suspense } from 'react';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import CredentialCreateButton from '@/features/credential/components/CredentialCreateButton';
import CredentialList from '@/features/credential/components/CredentialList';
import OrganizationBreadcrumbs from '../../../_navigation/Tabs';

type Props = {
	params: Promise<{ organizationId: string }>;
};

async function CredentialsPage({ params }: Props) {
	const { organizationId } = await params;

	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading
				title="Credentials"
				description="Manage your organization's API secrets"
				tabs={<OrganizationBreadcrumbs />}
				actions={<CredentialCreateButton organizationId={organizationId} />}
			/>
			<Suspense fallback={<Spinner />}>
				<CredentialList organizationId={organizationId} />
			</Suspense>
		</div>
	);
}

export default CredentialsPage;
