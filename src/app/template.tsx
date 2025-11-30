import type { ReactNode } from 'react';
import RedirectToast from '@/components/RedirectToast';

export default function RootTemplate({ children }: { children: ReactNode }) {
	return (
		<>
			{children}
			<RedirectToast />
		</>
	);
}
