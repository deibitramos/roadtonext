import { getSessionUserOrRedirect } from '@/lib/auth/session';

type Props = { children?: React.ReactNode };
export default async function OrganizationRequiredLayout({ children }: Props) {
	await getSessionUserOrRedirect();
	return children;
}
