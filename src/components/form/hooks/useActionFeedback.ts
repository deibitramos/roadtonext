import { useEffect, useRef } from 'react';
import type { ActionState } from '../utils/toActionState';

type UseActionFeedbackOptions<T> = {
	onSuccess?: (onArgs: { actionState: ActionState<T> }) => void;
	onError?: (onArgs: { actionState: ActionState<T> }) => void;
};

const useActionFeedback = <T>(
	actionState: ActionState<T>,
	options: UseActionFeedbackOptions<T> = {},
) => {
	const prevTimestamp = useRef(actionState.timestamp);
	const isUpdate = prevTimestamp.current !== actionState.timestamp;

	useEffect(() => {
		if (!isUpdate) return;
		if (actionState.status === 'SUCCESS') {
			options.onSuccess?.({ actionState });
		}
		if (actionState.status === 'ERROR') {
			options.onError?.({ actionState });
		}
		prevTimestamp.current = actionState.timestamp;
	}, [isUpdate, actionState, options]);
};

export default useActionFeedback;
