'use client';

import type { Route } from 'next';
import { useParams, usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const tabSections = (organizationId: string) =>
	({
		memberships: ['Memberships', `/organization/${organizationId}/memberships` as Route],
		invitations: ['Invitations', `/organization/${organizationId}/invitations` as Route],
		credentials: ['Credentials', `/organization/${organizationId}/credentials` as Route],
	}) satisfies { [key: string]: [string, Route] };

function OrganizationBreadcrumbs() {
	const params = useParams<{ organizationId: string }>();
	const pathName = usePathname();

	const sections = tabSections(params.organizationId);
	const lastUrlPart = (pathName.split('/').at(-1) ?? 'memberships') as keyof typeof sections;

	const [title = 'Memberships'] = sections[lastUrlPart];
	const dropdown = Object.entries(sections).map(([_key, [title, href]]) => ({ title, href }));

	return (
		<Breadcrumbs
			breadcrumbs={[
				{ title: 'Organizations', href: '/organization' },
				{ title, dropdown },
			]}
		/>
	);
}

export default OrganizationBreadcrumbs;
