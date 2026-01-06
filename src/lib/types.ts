import type { ComponentType } from 'react';

export type IconComponent = ComponentType<{ className?: string }>;

export type ActionResult<T = void> =
	| { data: T | undefined; error?: never }
	| { data?: never; error: { message: string } };

export const actionSuccess = <T>(data?: T): ActionResult<T> => ({ data });
export const actionError = (message: string): ActionResult<never> => ({ error: { message } });
