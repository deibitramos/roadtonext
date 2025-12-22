import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const apiAuthPrefix = '/api/auth';
const authRoutes = ['/sign-in', '/sign-up', '/forgot-password'];
const publicRoutes = ['/'];
const DEFAULT_LOGIN_REDIRECT = '/';

export async function proxy(request: NextRequest) {
	const url = request.nextUrl.pathname;
	const isApiAuth = url.startsWith(apiAuthPrefix);
	if (isApiAuth) return NextResponse.next();

	const session = getSessionCookie(request);
	const isPublicRoute = publicRoutes.includes(url);
	const isAuthRoute = authRoutes.some((path) => url.startsWith(path));

	if (isAuthRoute) {
		if (session) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
		}
		return NextResponse.next();
	}

	if (!session && !isPublicRoute) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
