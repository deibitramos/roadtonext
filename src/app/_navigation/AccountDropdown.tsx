import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { LockIcon } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SignOutButton from '@/features/auth/components/SignOutButton';
import { getSessionUser } from '@/lib/auth/session';

async function AccountDropdown() {
	const user = await getSessionUser();
	const initials = user.name
		.split(' ')
		.map((n) => n[0].toUpperCase())
		.join('');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<Avatar>
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/account/profile">
						<LockIcon className="mr-2" />
						<span>Profile</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/account/password">
						<LockIcon className="mr-2" />
						<span>Password</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<SignOutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default AccountDropdown;
