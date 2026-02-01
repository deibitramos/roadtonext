import { InfoIcon } from 'lucide-react';
import Link from 'next/link';

function StripeTestModeNotice() {
	return (
		<div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
			<InfoIcon className="size-5 shrink-0 mt-0.5" />
			<div>
				<p className="font-medium">Demo Mode - Stripe Test Environment</p>
				<p className="mt-1 text-blue-700 dark:text-blue-300">
					This is a demo application using Stripe&apos;s test mode. No real payments will be
					processed. You can use{' '}
					<Link
						href="https://docs.stripe.com/testing#cards"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium underline underline-offset-2 hover:text-blue-900 dark:hover:text-blue-100"
					>
						Stripe test cards
					</Link>{' '}
					to try the checkout flow (e.g., <code className="font-mono text-xs">4242 4242 4242 4242</code>).
				</p>
			</div>
		</div>
	);
}

export default StripeTestModeNotice;
