import Link from 'next/link';
import SignOutButton from '@/features/auth/components/SignOutButton';
import { Button } from './ui/button';

function PrivateNavButtons() {
	return (
		<>
			<Button variant="default" asChild>
				<Link href="/tickets">Tickets</Link>
			</Button>
			<SignOutButton />
		</>
	);
}

export default PrivateNavButtons;
