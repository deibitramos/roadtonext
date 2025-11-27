'use server';

import { cookies } from 'next/headers';

export async function setCookie(key: string, value: string) {
	const cookieStore = await cookies();
	cookieStore.set(key, value);
}

export async function getCookie(name: string) {
	const cookieStore = await cookies();
	const cookie = cookieStore.get(name);
	if (!cookie) return null;
	return cookie.value;
}

export async function deleteCookie(key: string) {
	const cookieStore = await cookies();
	cookieStore.delete(key);
}

export async function consumeCookie(key: string) {
	const message = await getCookie(key);
	await deleteCookie(key);
	return message;
}
