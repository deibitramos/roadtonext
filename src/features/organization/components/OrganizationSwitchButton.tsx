'use client';

import { ArrowLeftRightIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import SubmitButton from '@/components/form/SubmitButton';
import switchOrganization from '@/organization/actions/switchOrganization';

type Props = {
	organizationId: string;
	isActive: boolean;
	hasActive: boolean;
};

function OrganizationSwitchButton({ organizationId, isActive, hasActive }: Props) {
	const [isPending, startTransition] = useTransition();

	const handleSwitch = () => {
		startTransition(async () => {
			const result = await switchOrganization(organizationId);
			if (result.error) {
				toast.error(result.error.message);
			} else {
				toast.success('Active organization has been switched');
			}
		});
	};

	return (
		<SubmitButton
			type="button"
			variant={isActive ? 'default' : 'outline'}
			onClick={handleSwitch}
			disabled={isPending || isActive}
			isSubmitting={isPending}
			icon={ArrowLeftRightIcon}
		>
			{!hasActive ? 'Activate' : isActive ? 'Active' : 'Switch'}
		</SubmitButton>
	);
}

export default OrganizationSwitchButton;
