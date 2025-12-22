import { BookIcon, CircleUserIcon, LibraryIcon } from 'lucide-react';
import type { NavItem } from './types';

const items = [
	['All Tickets', LibraryIcon, '/', false],
	['My Tickets', BookIcon, '/tickets', false],
	[
		'Account',
		CircleUserIcon,
		'/account/profile',
		true,
		(path: string) => path.startsWith('/account'),
	],
] as const;

export const navItems: NavItem[] = items.map(([title, Icon, href, separator, matches]) => ({
	...{ title, href, Icon, separator, matches },
}));

export const closedClassName =
	'text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100';
