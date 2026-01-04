'use client';

import { ArrowLeftRightIcon } from 'lucide-react';
import { useActionState } from 'react';
import ActionForm from '@/components/form/ActionForm';
import SubmitButton from '@/components/form/SubmitButton';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/toActionState';
import switchOrganization from '@/organization/actions/switchOrganization';

type Props = {
	organizationId: string;
	isActive: boolean;
	hasActive: boolean;
};

function OrganizationSwitchButton({ organizationId, isActive, hasActive }: Props) {
	const [actionState, action] = useActionState(
		switchOrganization.bind(null, organizationId),
		EMPTY_ACTION_STATE,
	);

	return (
		<ActionForm action={action} actionState={actionState}>
			<SubmitButton variant={isActive ? 'default' : 'outline'} icon={ArrowLeftRightIcon}>
				{!hasActive ? 'Activate' : isActive ? 'Active' : 'Switch'}
			</SubmitButton>
		</ActionForm>
	);
}

export default OrganizationSwitchButton;
