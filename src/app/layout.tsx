import type { Metadata } from 'next';
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from './_providers/react-query/ReactQueryProvider';

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
				<NuqsAdapter>
					<ThemeProvider>
						<ReactQueryProvider>
							{children}
							<Toaster expand />
						</ReactQueryProvider>
					</ThemeProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
