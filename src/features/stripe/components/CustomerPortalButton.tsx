'use client';

import type { PropsWithChildren } from 'react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import SubmitButton from '@/components/form/SubmitButton';
import createCustomerPortal from '../actions/createCustomerPortal';

type Props = {
	organizationId: string;
};

function CustomerPortalButton({ organizationId, children }: PropsWithChildren<Props>) {
	const [isPending, startTransition] = useTransition();

	const handleCustomerPortal = () => {
		startTransition(async () => {
			const { error } = await createCustomerPortal(organizationId);
			if (error) {
				toast.error(error.message);
			}
		});
	};

	return (
		<SubmitButton type="button" onClick={handleCustomerPortal} isSubmitting={isPending}>
			{children}
		</SubmitButton>
	);
}

export default CustomerPortalButton;
