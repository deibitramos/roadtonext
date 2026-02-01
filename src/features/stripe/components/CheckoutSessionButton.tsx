'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import SubmitButton from '@/components/form/SubmitButton';
import { cn } from '@/lib/utils';
import createCheckoutSession from '../actions/createCheckoutSession';
import createCustomerPortal from '../actions/createCustomerPortal';

type Props = {
	organizationId: string | undefined;
	priceId: string;
	activePriceId: string | null | undefined;
	children: React.ReactNode;
};

function CheckoutSessionButton({ organizationId, priceId, activePriceId, children }: Props) {
	const [isPending, startTransition] = useTransition();

	const handleCheckoutSession = () => {
		startTransition(async () => {
			const { error } = !activePriceId
				? await createCheckoutSession(organizationId, priceId)
				: await createCustomerPortal(organizationId);

			if (error) toast.error(error.message);
		});
		console.log('checkout session');
	};

	const isActive = activePriceId === priceId;

	return (
		<SubmitButton
			type="button"
			disabled={isActive}
			onClick={handleCheckoutSession}
			isSubmitting={isPending}
			className={cn(!!activePriceId && 'h-16')}
		>
			<div className="flex flex-col">
				{!activePriceId ? null : isActive ? <span>Current Plan</span> : <span>Change Plan</span>}
				<div>{children}</div>
			</div>
		</SubmitButton>
	);
}

export default CheckoutSessionButton;
