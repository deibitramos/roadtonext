'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { consumeCookie, deleteCookie } from '@/actions/cookies';

function RedirectToast() {
	useEffect(() => {
		const showCookieToast = async () => {
			const message = await consumeCookie('toast');
			if (message) {
				toast.success(message);
				await deleteCookie('toast');
			}
		};
		showCookieToast();
	}, []);
	return null;
}

export default RedirectToast;
