'use server';

import { cookies } from 'next/headers';

export async function setCookie(key: string, value: string) {
	const cookieStore = await cookies();
	cookieStore.set(key, value);
}

export async function getCookieValue(key: string) {
	const store = await cookies();
	const cookie = store.get(key);
	if (!cookie) return null;
	return cookie.value;
}

export async function deleteCookie(key: string) {
	const store = await cookies();
	store.delete(key);
}
