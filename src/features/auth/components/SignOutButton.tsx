'use client';

import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { signOut } from '@/lib/auth/client';
import { cn } from '@/lib/utils';

function SignOutButton() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const onSignOutSuccess = () => {
		router.push('/');
		router.refresh();
	};

	const onClick = async () => {
		if (isPending) return;
		startTransition(async () => {
			await signOut({ fetchOptions: { onSuccess: onSignOutSuccess } });
		});
	};

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isPending}
			className={cn(
				'w-full text-left flex items-center',
				isPending && 'opacity-50 cursor-not-allowed',
			)}
		>
			<LogOutIcon className="mr-2 size-4" />
			Sign out
		</button>
	);
}

export default SignOutButton;
