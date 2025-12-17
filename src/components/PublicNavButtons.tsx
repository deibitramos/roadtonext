import Link from 'next/link';
import { Button } from './ui/button';

function PublicNavButtons() {
	return (
		<>
			<Button variant="outline" asChild>
				<Link href="/sign-up">Sign Up</Link>
			</Button>
			<Button variant="outline" asChild>
				<Link href="/sign-in">Sign In</Link>
			</Button>
		</>
	);
}

export default PublicNavButtons;
