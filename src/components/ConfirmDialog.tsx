import { type ReactElement, useActionState } from 'react';
import ActionForm from './form/ActionForm';
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
	AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';

type Props = {
	title?: string;
	description?: string;
	action: () => Promise<ActionState>;
	trigger?: ReactElement;
	open?: boolean;
	onOpenChange?: (value: boolean) => void;
	onSuccess?: (actionState?: ActionState) => void;
};

function ConfirmDialog({
	open = false,
	onOpenChange,
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone.',
	action,
	trigger,
	onSuccess,
}: Props) {
	const [actionState, newAction] = useActionState(action, EMPTY_ACTION_STATE);

	const handleSuccess = () => {
		onOpenChange?.(false);
		onSuccess?.(actionState);
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			{trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<ActionForm action={newAction} actionState={actionState} onSuccess={handleSuccess}>
							<Button type="submit">Confirm</Button>
						</ActionForm>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ConfirmDialog;
