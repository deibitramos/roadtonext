'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { consumeCookie, deleteCookie } from '@/actions/cookies';

function RedirectToast() {
	const pathname = usePathname();

	// biome-ignore lint/correctness/useExhaustiveDependencies: required
	useEffect(() => {
		const showCookieToast = async () => {
			const message = await consumeCookie('toast');
			if (message) {
				toast.success(message);
				await deleteCookie('toast');
			}
		};
		showCookieToast();
	}, [pathname]);
	return null;
}

export default RedirectToast;
