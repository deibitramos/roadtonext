import { ZodError, z } from 'zod/v4';

export type ActionState = {
	message: string;
	payload?: FormData;
	fieldErrors?: Record<string, string>;
	status?: 'SUCCESS' | 'ERROR';
	timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = { message: '', timestamp: Date.now() };

export const fromErrorToActionState = (error: unknown, formData?: FormData): ActionState => {
	if (error instanceof ZodError) {
		const fieldErrors = z.flattenError(error).fieldErrors;
		return { message: '', fieldErrors, payload: formData, status: 'ERROR', timestamp: Date.now() };
	}

	const message = error instanceof Error ? error.message : 'An unknown error occurred';
	return { message, payload: formData, status: 'ERROR', timestamp: Date.now() };
};

export const toActionState = (message: string): ActionState => {
	return { message, status: 'SUCCESS', timestamp: Date.now() };
};
