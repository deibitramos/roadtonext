import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';

type Props = {
	params: Promise<{ organizationId: string }>;
	children: React.ReactNode;
};
export default async function AdminLayout({ params, children }: Props) {
	const { organizationId } = await params;
	await getAdminOrRedirect(organizationId);
	return children;
}
