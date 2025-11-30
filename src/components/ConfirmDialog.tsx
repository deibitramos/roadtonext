import { type ReactElement, useActionState } from 'react';
import Form from './form/Form';
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
};

function ConfirmDialog({
	open = false,
	onOpenChange,
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone.',
	action,
	trigger,
}: Props) {
	const [actionState, newAction] = useActionState(action, EMPTY_ACTION_STATE);
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
						<Form action={newAction} actionState={actionState}>
							<Button type="submit">Confirm</Button>
						</Form>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ConfirmDialog;
