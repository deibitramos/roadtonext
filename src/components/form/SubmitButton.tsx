'use client';

import { LoaderCircleIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Button } from '../ui/button';

type Props = {
	type?: 'button' | 'submit';
	isSubmitting?: boolean;
	onClick?: () => void;
};

const SubmitButton = ({
	type = 'submit',
	onClick,
	isSubmitting = false,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<Button type={type} disabled={isSubmitting} onClick={onClick}>
			{isSubmitting && <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />}
			{children}
		</Button>
	);
};

export default SubmitButton;
