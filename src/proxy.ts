import { type NextRequest, NextResponse } from 'next/server';
import { getMiddlewareSession } from '@/lib/auth/session';

const apiPrefix = '/api';
const authRoutes = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'];
const publicRoutes = ['/'];
const emailVerifyRoute = '/email-verify';
const DEFAULT_LOGIN_REDIRECT = '/';

export async function proxy(request: NextRequest) {
	const url = request.nextUrl.pathname;
	const isApi = url.startsWith(apiPrefix);
	if (isApi) return NextResponse.next();

	const session = await getMiddlewareSession(request);
	const isPublicRoute = publicRoutes.includes(url);
	const isAuthRoute = authRoutes.some((path) => url.startsWith(path));
	const isEmailVerifyRoute = url.startsWith(emailVerifyRoute);

	// Auth routes: redirect authenticated users home, allow unauthenticated users
	if (isAuthRoute) {
		if (session) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
		}
		return NextResponse.next();
	}

	// Email verify route: requires authentication but allows unverified users
	if (isEmailVerifyRoute) {
		if (!session) {
			return NextResponse.redirect(new URL('/sign-in', request.url));
		}
		return NextResponse.next();
	}

	// All other routes: require authentication
	if (!session && !isPublicRoute) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}

	// Protected routes: require email verification (excluding public and email-verify routes)
	if (session && !session.user.emailVerified && !isPublicRoute) {
		return NextResponse.redirect(new URL(emailVerifyRoute, request.url));
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
