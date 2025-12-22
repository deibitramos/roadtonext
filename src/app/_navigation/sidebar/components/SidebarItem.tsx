import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { closedClassName } from '../constants';
import type { NavItem } from '../types';

type Props = {
	isOpen: boolean;
	navItem: NavItem;
};

function SidebarItem({ isOpen, navItem }: Props) {
	const path = usePathname();
	const isActive = navItem?.matches?.(path) ?? path === navItem.href;
	const { title, href, Icon, separator } = navItem;

	return (
		<>
			{separator && <Separator />}
			<Link
				href={href}
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'group relative flex h-12 justify-start',
					isActive && 'bg-muted font-bold hover:bg-muted',
				)}
			>
				<div className="size-5">
					<Icon className="size-full" />
				</div>
				<span
					className={cn(
						'absolute left-12 text-base duration-200',
						isOpen ? 'md:block hidden' : 'w-19.5',
						!isOpen && closedClassName,
					)}
				>
					{title}
				</span>
			</Link>
		</>
	);
}

export default SidebarItem;
