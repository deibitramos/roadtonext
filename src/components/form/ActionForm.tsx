import type { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import useActionFeedback from './hooks/useActionFeedback';
import type { ActionState } from './utils/toActionState';

type Props<T> = {
	action: (payload: FormData) => void;
	actionState: ActionState<T>;
	onSuccess?: (actionState: ActionState<T>) => void;
	onError?: (actionState: ActionState<T>) => void;
};

function ActionForm<T>({
	action,
	actionState,
	children,
	onSuccess,
	onError,
}: PropsWithChildren<Props<T>>) {
	useActionFeedback(actionState, {
		onSuccess: ({ actionState }) => {
			console.log('ActionForm onSuccess', actionState);
			onSuccess?.(actionState);
			if (!actionState.message) return;
			toast.success(actionState.message);
		},
		onError: ({ actionState }) => {
			onError?.(actionState);
			if (!actionState.message) return;
			toast.error(actionState.message);
		},
	});

	return (
		<form action={action} className="flex flex-col gap-y-2">
			{children}
		</form>
	);
}

export default ActionForm;
