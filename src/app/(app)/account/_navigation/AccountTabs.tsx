'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AccountTabs = () => {
	const pathName = usePathname();

	return (
		<Tabs value={pathName.split('/').at(-1)}>
			<TabsList>
				<TabsTrigger value="profile" asChild>
					<Link href="/account/profile">Profile</Link>
				</TabsTrigger>
				<TabsTrigger value="password" asChild>
					<Link href="/account/password">Password</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
};

export { AccountTabs };
