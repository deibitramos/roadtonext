import { ZodError, z } from 'zod/v4';
import { getErrorMessage } from '@/lib/error';

type ActionStatus = 'SUCCESS' | 'ERROR';

export type ActionState<T = never> = {
	message: string;
	payload?: FormData;
	fieldErrors?: Record<string, string>;
	status?: ActionStatus;
	timestamp: number;
	data?: T;
};

export const EMPTY_ACTION_STATE: ActionState = { message: '', timestamp: Date.now() };

export const fromErrorToActionState = <T = never>(
	error: unknown,
	formData?: FormData,
): ActionState<T> => {
	if (error instanceof ZodError) {
		const fieldErrors = z.flattenError(error).fieldErrors;
		return { message: '', fieldErrors, payload: formData, status: 'ERROR', timestamp: Date.now() };
	}

	const message = getErrorMessage(error);
	return { message, payload: formData, status: 'ERROR', timestamp: Date.now() };
};

export const toActionState = <T = never>(
	message: string,
	status: ActionStatus = 'SUCCESS',
	data?: T,
): ActionState<T> => {
	return { message, status, timestamp: Date.now(), data };
};
