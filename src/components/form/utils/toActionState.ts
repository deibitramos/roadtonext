import { ZodError, z } from 'zod/v4';

type ActionStatus = 'SUCCESS' | 'ERROR';

export type ActionState<T = unknown> = {
	message: string;
	payload?: FormData;
	fieldErrors?: Record<string, string>;
	status?: ActionStatus;
	timestamp: number;
	data?: T;
};

export const EMPTY_ACTION_STATE: ActionState<unknown> = { message: '', timestamp: Date.now() };

export const fromErrorToActionState = <T>(error: unknown, formData?: FormData): ActionState<T> => {
	if (error instanceof ZodError) {
		const fieldErrors = z.flattenError(error).fieldErrors;
		return { message: '', fieldErrors, payload: formData, status: 'ERROR', timestamp: Date.now() };
	}

	const message = error instanceof Error ? error.message : 'An unknown error occurred';
	return { message, payload: formData, status: 'ERROR', timestamp: Date.now() };
};

export const toActionState = <T>(
	message: string,
	status: ActionStatus = 'SUCCESS',
	data?: T,
): ActionState<T> => {
	return { message, status, timestamp: Date.now(), data };
};
