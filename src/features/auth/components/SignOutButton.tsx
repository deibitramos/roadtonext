'use client';

import { LogOutIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import SubmitButton from '@/components/form/SubmitButton';
import { signOut } from '@/lib/auth/client';

function SignOutButton() {
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		startTransition(async () => {
			await signOut({
				fetchOptions: { onSuccess: () => redirect('/') },
			});
		});
	};

	return (
		<SubmitButton type="button" isSubmitting={isPending} onClick={onClick}>
			Sign out
			<LogOutIcon />
		</SubmitButton>
	);
}

export default SignOutButton;
