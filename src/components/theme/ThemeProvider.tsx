import { ThemeProvider as BaseThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

function ThemeProvider({ children }: PropsWithChildren) {
	return (
		<BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>
			{children}
		</BaseThemeProvider>
	);
}

export default ThemeProvider;
