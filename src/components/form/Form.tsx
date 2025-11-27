import type { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import useActionFeedback from './hooks/useActionFeedback';
import type { ActionState } from './utils/toActionState';

type Props = {
	action: (payload: FormData) => void;
	actionState: ActionState;
};

function Form({ action, actionState, children }: PropsWithChildren<Props>) {
	useActionFeedback(actionState, {
		onSuccess: ({ actionState }) => {
			if (!actionState.message) return;
			toast.success(actionState.message);
		},
		onError: ({ actionState }) => {
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

export default Form;
