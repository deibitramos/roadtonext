import { toCurrencyFromCent } from '@/lib/currency';
import stripe from '@/lib/stripe';
import CheckoutSessionButton from './CheckoutSessionButton';

type PriceProps = {
	organizationId: string | undefined;
	productId: string;
	activePriceId: string | null | undefined;
};

async function Prices({ organizationId, productId, activePriceId }: PriceProps) {
	const prices = await stripe.prices.list({ active: true, product: productId });

	return (
		<div className="flex gap-x-2">
			{prices.data.map((price) => (
				<CheckoutSessionButton
					key={price.id}
					organizationId={organizationId}
					priceId={price.id}
					activePriceId={activePriceId}
				>
					<span className="font-bold text-lg">
						{toCurrencyFromCent(price.unit_amount || 0, price.currency)}
					</span>
					&nbsp;/&nbsp;<span>{price.recurring?.interval}</span>
				</CheckoutSessionButton>
			))}
		</div>
	);
}

export default Prices;
