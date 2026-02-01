import { SettingsIcon } from 'lucide-react';
import { Suspense } from 'react';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import CustomerPortalButton from '@/features/stripe/components/CustomerPortalButton';
import Products from '@/features/stripe/components/Products';
import OrganizationBreadcrumbs from '../../../_navigation/Tabs';

type Props = {
	params: Promise<{ organizationId: string }>;
};

async function SubscriptionPage({ params }: Props) {
	const { organizationId } = await params;

	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading
				title="Subscription"
				description="Manage your subscription"
				tabs={<OrganizationBreadcrumbs />}
				actions={
					<CustomerPortalButton organizationId={organizationId}>
						<SettingsIcon className="size-4" />
						Manage Subscription
					</CustomerPortalButton>
				}
			/>
			<Suspense fallback={<Spinner />}>
				<Products organizationId={organizationId} />
			</Suspense>
		</div>
	);
}

export default SubscriptionPage;
