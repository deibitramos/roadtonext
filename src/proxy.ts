import { type NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'];
const publicRoutes = ['/'];

// Better Auth session cookie name
const SESSION_COOKIE = 'better-auth.session_token';

export async function proxy(request: NextRequest) {
	const url = request.nextUrl.pathname;

	if (publicRoutes.includes(url) || authRoutes.some((path) => url.startsWith(path)))
		return NextResponse.next();

	const hasSessionCookie = !!request.cookies.get(SESSION_COOKIE)?.value;
	if (!hasSessionCookie) return NextResponse.redirect(new URL('/sign-in', request.url));

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - api (API routes)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
