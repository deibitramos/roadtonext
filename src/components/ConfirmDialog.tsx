'use client';

import { type ReactElement, useTransition } from 'react';
import { toast } from 'sonner';
import type { ActionResult } from '@/lib/types';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';

type Props<T> = {
	title?: string;
	description?: string;
	action: () => Promise<ActionResult<T>>;
	trigger?: ReactElement;
	open?: boolean;
	closeModal: () => void;
	onSuccess?: (data?: T) => void;
};

function ConfirmDialog<T = void>({
	open = false,
	closeModal,
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone.',
	action,
	onSuccess,
}: Props<T>) {
	const [isPending, startTransition] = useTransition();

	const handleConfirm = () => {
		closeModal();
		startTransition(async () => {
			const loadingToast = toast.loading('Deleting...');
			const { data, error } = await action();
			toast.dismiss(loadingToast);

			if (error) {
				toast.error(error.message);
			} else {
				onSuccess?.(data);
			}
		});
	};

	return (
		<AlertDialog open={open} onOpenChange={closeModal}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
					<Button onClick={handleConfirm} disabled={isPending}>
						{isPending ? 'Processing...' : 'Confirm'}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ConfirmDialog;
