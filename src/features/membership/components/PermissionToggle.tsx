'use client';

import { BanIcon, CheckIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import SubmitButton from '@/components/form/SubmitButton';
import togglePermission from '../actions/togglePermission';

type Props = {
	userId: string;
	organizationId: string;
	permission: 'canDeleteTicket';
	value: boolean;
};

function PermissionToggle({ userId, organizationId, permission, value }: Props) {
	const [isPending, startTransition] = useTransition();

	const handleToggle = () => {
		startTransition(async () => {
			const result = await togglePermission(userId, organizationId, permission);
			if (result.error) {
				toast.error(result.error.message);
			} else {
				toast.success('Permission updated successfully');
			}
		});
	};

	return (
		<SubmitButton
			type="button"
			onClick={handleToggle}
			isSubmitting={isPending}
			variant={value ? 'secondary' : 'outline'}
			icon={value ? CheckIcon : BanIcon}
		/>
	);
}

export default PermissionToggle;
