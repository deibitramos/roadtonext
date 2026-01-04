import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import OrganizationList from '@/features/organization/components/OrganizationList';
import { redirectIfHasActiveOrganization } from '@/lib/auth/session';

async function SelectActiveOrganizationPage() {
	await redirectIfHasActiveOrganization();
	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading
				title="Select Organization"
				description="Pick one organization to work with"
				actions={
					<Button asChild>
						<Link href="/onboarding">
							<PlusIcon className="size-4" />
							Create Organization
						</Link>
					</Button>
				}
			/>
			<Suspense fallback={<Spinner />}>
				<OrganizationList protect={false} />
			</Suspense>
		</div>
	);
}

export default SelectActiveOrganizationPage;
