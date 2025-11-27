import type { ActionState } from './utils/toActionState';

type Props = {
	actionState: ActionState;
	name: string;
};

function FieldError({ actionState, name }: Props) {
	const message = actionState.fieldErrors?.[name];
	if (!message) return null;

	return <span className="text-xs text-red-500">{message}</span>;
}

export default FieldError;
