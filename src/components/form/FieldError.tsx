import type { ActionState } from './utils/toActionState';

type Props<T> = {
	actionState: ActionState<T>;
	name: string;
};

function FieldError<T>({ actionState, name }: Props<T>) {
	const message = actionState.fieldErrors?.[name];
	if (!message) return null;

	return <span className="text-xs text-red-500">{message}</span>;
}

export default FieldError;
