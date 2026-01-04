import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import OrganizationList from '@/features/organization/components/OrganizationList';

async function OrganizationPage() {
	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading
				title="Organizations"
				description="All your organizations"
				actions={
					<Button asChild>
						<Link href="/organization/create">
							<PlusIcon className="size-4" />
							Create Organization
						</Link>
					</Button>
				}
			/>
			<Suspense fallback={<Spinner />}>
				<OrganizationList />
			</Suspense>
		</div>
	);
}

export default OrganizationPage;
