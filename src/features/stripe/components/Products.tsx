import { BadgeCheckIcon, CheckIcon } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import stripe from '@/lib/stripe';
import getStripeCustomer from '../queries/getStripeCustomer';
import Prices from './Prices';
import StripeTestModeNotice from './StripeTestModeNotice';

type ProductsProps = {
	organizationId: string | undefined;
};

async function Products({ organizationId }: ProductsProps) {
	const customer = await getStripeCustomer(organizationId);

	const subscriptionStatus = customer?.subscriptionStatus;
	const activeSubscription = subscriptionStatus === 'active';
	const activeProductId = activeSubscription ? customer?.productId : null;
	const activePriceId = activeSubscription ? customer?.priceId : null;

	const products = await stripe.products.list({ active: true });

	return (
		<div className="flex-1 flex flex-col items-center gap-y-6">
			<StripeTestModeNotice />
			<div className="flex justify-center items-center gap-x-4">
			{products.data.map((product) => (
				<Card key={product.id}>
					<CardHeader>
						<CardTitle className="flex justify-between">
							{product.name}
							{activeProductId === product.id ? <BadgeCheckIcon /> : null}
						</CardTitle>
						<CardDescription>{product.description}</CardDescription>
					</CardHeader>
					<CardContent>
						{product.marketing_features.map((feature) => (
							<div key={feature.name} className="flex gap-x-2">
								<CheckIcon /> {feature.name}
							</div>
						))}
					</CardContent>
					<CardFooter>
						<Prices
							organizationId={organizationId}
							productId={product.id}
							activePriceId={activePriceId}
						/>
					</CardFooter>
				</Card>
			))}
			</div>
		</div>
	);
}

export default Products;
