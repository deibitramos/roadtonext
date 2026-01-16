'use client';

import type { Route } from 'next';
import { useParams, usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';

function OrganizationBreadcrumbs() {
	const params = useParams<{ organizationId: string }>();
	const pathName = usePathname();
	const lastUrlPart = pathName.split('/').at(-1) as 'memberships' | 'invitations' | undefined;

	const title = {
		memberships: 'Memberships' as const,
		invitations: 'Invitations' as const,
	}[lastUrlPart ?? 'memberships'];

	return (
		<Breadcrumbs
			breadcrumbs={[
				{ title: 'Organizations', href: '/organization' },
				{
					title,
					dropdown: [
						{
							title: 'Memberships',
							href: `/organization/${params.organizationId}/memberships` as Route,
						},
						{
							title: 'Invitations',
							href: `/organization/${params.organizationId}/invitations` as Route,
						},
					],
				},
			]}
		/>
	);
}

export default OrganizationBreadcrumbs;
