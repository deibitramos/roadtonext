import Link from 'next/dist/client/link';
import Placeholder from '@/components/Placeholder';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<Placeholder label="Ticket not found">
			<Button asChild variant="outline">
				<Link href="/tickets">Go back</Link>
			</Button>
		</Placeholder>
	);
}
