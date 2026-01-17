'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import SubmitButton from '@/components/form/SubmitButton';
import acceptInvitation from '../actions/acceptInvitation';

type Props = {
	id: string;
	tokenId: string;
};

function InvitationAcceptButton({ id, tokenId }: Props) {
	const [isPending, startTransition] = useTransition();

	const handleAccept = () => {
		startTransition(async () => {
			const { error } = await acceptInvitation(id, tokenId);
			if (error) {
				toast.error(error.message);
			}
		});
	};

	return (
		<SubmitButton isSubmitting={isPending} onClick={handleAccept}>
			Accept
		</SubmitButton>
	);
}

export default InvitationAcceptButton;
