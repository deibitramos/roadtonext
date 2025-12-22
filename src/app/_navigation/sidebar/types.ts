import type { Route } from 'next';
import type { IconComponent } from '@/lib/types';

export type NavItem = {
	title: string;
	href: Route;
	Icon: IconComponent;
	separator: boolean;
	matches?: (path: string) => boolean;
};
