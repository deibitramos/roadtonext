import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Road to Next.js",
	description: "My Road to Next.js course project",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
					<Link href="/" className="text-lg font-bold">
						Home
					</Link>
					<Link href="/tickets" className="text-sm underline">
						Tickets
					</Link>
				</nav>
				<main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">
					{children}
				</main>
			</body>
		</html>
	);
}
