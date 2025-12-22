'use client';

import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth/client';

function SignOutButton() {
	const router = useRouter();

	const onSignOutSuccess = () => {
		router.push('/');
		router.refresh();
	};

	const onClick = async () => {
		await signOut({ fetchOptions: { onSuccess: onSignOutSuccess } });
	};

	return (
		<>
			<LogOutIcon className="mr-2 size-4" />
			<button type="button" onClick={onClick}>
				Sign out
			</button>
		</>
	);
}

export default SignOutButton;
