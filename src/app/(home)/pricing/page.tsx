import Products from '@/features/stripe/components/Products';
import { getSessionUserOrUndefined } from '@/lib/auth/session';

async function PricingPage() {
	const user = await getSessionUserOrUndefined();
	return <Products organizationId={user?.activeMembershipId} />;
}

export default PricingPage;
