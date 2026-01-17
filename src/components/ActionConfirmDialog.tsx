import { type ReactElement, useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import useActionFeedback from './form/hooks/useActionFeedback';
import { type ActionState, EMPTY_ACTION_STATE } from './form/utils/toActionState';
import {
	AlertDialog,
	AlertDialogAction,
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
	action: () => Promise<ActionState<T>>;
	trigger?: ReactElement;
	open?: boolean;
	closeModal: () => void;
	onSuccess?: (actionState?: ActionState<T>) => void;
};

function ConfirmDialog<T = never>({
	open = false,
	closeModal,
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone.',
	action,
	onSuccess,
}: Props<T>) {
	const [actionState, newAction, isPending] = useActionState(action, EMPTY_ACTION_STATE);

	const handleSuccess = () => {
		closeModal();
		onSuccess?.(actionState);
	};

	const toastRef = useRef<string | number | null>(null);

	useEffect(() => {
		if (isPending) {
			toastRef.current = toast.loading('Deleting ...');
		} else if (toastRef.current) {
			toast.dismiss(toastRef.current);
		}

		return () => {
			if (toastRef.current) {
				toast.dismiss(toastRef.current);
			}
		};
	}, [isPending]);

	useActionFeedback(actionState, {
		onSuccess: ({ actionState }) => {
			if (!actionState.message) return;
			toast.success(actionState.message);
			handleSuccess();
		},
		onError: ({ actionState }) => {
			if (!actionState.message) return;
			toast.error(actionState.message);
		},
	});

	return (
		<AlertDialog open={open} onOpenChange={closeModal}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<form action={newAction}>
							<Button type="submit">Confirm</Button>
						</form>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ConfirmDialog;
