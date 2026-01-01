'use client';

import { LoaderCircleIcon } from 'lucide-react';
import type { ComponentProps, PropsWithChildren } from 'react';
import { Button } from '../ui/button';

type Props = ComponentProps<typeof Button> & {
	type?: 'button' | 'submit';
	isSubmitting?: boolean;
};

const SubmitButton = (props: PropsWithChildren<Props>) => {
	const { type = 'submit', isSubmitting = false, children, ...restProps } = props;
	return (
		<Button type={type} disabled={isSubmitting} {...restProps}>
			{isSubmitting && <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />}
			{children}
		</Button>
	);
};

export default SubmitButton;
