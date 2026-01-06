'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { deleteCookie } from '@/actions/cookies';

type Props = {
	message: string;
	type?: 'success' | 'error';
};

function ToastTrigger({ message, type = 'success' }: Props) {
	const hasShown = useRef(false);

	useEffect(() => {
		if (hasShown.current) return;
		hasShown.current = true;

		if (type === 'success') {
			toast.success(message);
		} else {
			toast.error(message);
		}

		void deleteCookie('toast');
	}, [message, type]);

	return null;
}

export default ToastTrigger;
