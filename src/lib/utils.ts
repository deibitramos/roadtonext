import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getKeys<T extends object>(obj: T) {
	return Object.keys(obj) as (keyof T)[];
}
