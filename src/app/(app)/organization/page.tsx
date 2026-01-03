import { Suspense } from 'react';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import OrganizationList from '@/features/organization/components/OrganizationList';

function OrganizationPage() {
	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading title="Organizations" description="All your organizations" />
			<Suspense fallback={<Spinner />}>
				<OrganizationList />
			</Suspense>
		</div>
	);
}

export default OrganizationPage;
