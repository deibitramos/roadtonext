'use client';

import { LoaderCircleIcon } from 'lucide-react';
import type { ComponentProps, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import type { IconComponent } from '@/lib/types';
import { Button } from '../ui/button';

type Props = ComponentProps<typeof Button> & {
	type?: 'button' | 'submit';
	isSubmitting?: boolean;
	icon?: IconComponent;
};

const SubmitButton = (props: PropsWithChildren<Props>) => {
	const { type = 'submit', icon: Icon, isSubmitting, children, ...restProps } = props;
	const { pending } = useFormStatus();

	// Use explicit isSubmitting prop if provided (for react-hook-form), otherwise use useFormStatus
	const isPending = isSubmitting ?? pending;
	return (
		<Button type={type} disabled={isPending} {...restProps}>
			{isPending ? (
				<LoaderCircleIcon className="size-4 animate-spin" />
			) : Icon ? (
				<Icon className="size-4" />
			) : null}
			{children}
		</Button>
	);
};

export default SubmitButton;
