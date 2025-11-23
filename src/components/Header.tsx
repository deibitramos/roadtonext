import { KanbanIcon } from 'lucide-react';
import Link from 'next/link';
import ThemeSwitcher from './theme/ThemeSwitcher';
import { Button } from './ui/button';

function Header() {
	return (
		<nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
			<div className="flex items-center gap-x-2">
				<Button variant="ghost" asChild>
					<Link href="/">
						<KanbanIcon />
						<h1 className="text-lg font-semibold">TicketBounty</h1>
					</Link>
				</Button>
			</div>
			<div className="flex items-center gap-x-2">
				<ThemeSwitcher />
				<Button variant="default" asChild>
					<Link href="/tickets">Tickets</Link>
				</Button>
			</div>
		</nav>
	);
}

export default Header;
