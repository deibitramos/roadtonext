import { useEffect } from 'react';
import type { ActionState } from '../utils/toActionState';

type UseActionFeedbackOptions = {
	onSuccess?: (onArgs: { actionState: ActionState }) => void;
	onError?: (onArgs: { actionState: ActionState }) => void;
};

const useActionFeedback = (actionState: ActionState, options: UseActionFeedbackOptions = {}) => {
	useEffect(() => {
		if (actionState.status === 'SUCCESS') {
			options.onSuccess?.({ actionState });
		}
		if (actionState.status === 'ERROR') {
			options.onError?.({ actionState });
		}
	}, [actionState, options]);
};

export default useActionFeedback;
