import type { ReactNode } from 'react';
import RedirectToast from '@/components/RedirectToast';

export default async function RootTemplate({ children }: { children: ReactNode }) {
	return (
		<>
			{children}
			<RedirectToast />
		</>
	);
}
