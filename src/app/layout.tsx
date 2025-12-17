import type { Metadata } from 'next';
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'TicketBounty - Road to Next.js',
	description: 'My Road to Next.js course project',
};

type Props = { children?: React.ReactNode };
export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>
					{children}
					<Toaster expand />
				</ThemeProvider>
			</body>
		</html>
	);
}
