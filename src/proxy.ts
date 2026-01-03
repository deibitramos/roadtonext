import { type NextRequest, NextResponse } from 'next/server';
import { getMiddlewareSession } from '@/lib/auth/session';
import hasOneOrganization from './features/organization/queries/hasOneOrganization';

const authRoutes = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'];
const publicRoutes = ['/'];

export async function proxy(request: NextRequest) {
	const url = request.nextUrl.pathname;

	// Skip public routes (only Home for now)
	if (publicRoutes.includes(url)) return NextResponse.next();

	const session = await getMiddlewareSession(request);

	// Auth routes: redirect authenticated users to tickets page, allow unauthenticated users
	if (authRoutes.some((path) => url.startsWith(path)))
		return session ? NextResponse.redirect(new URL('/tickets', request.url)) : NextResponse.next();

	// Require authentication for all other routes
	if (!session) return NextResponse.redirect(new URL('/sign-in', request.url));

	// Require email email verification (excluding email-verify route)
	if (url.startsWith('/email-verify')) return NextResponse.next();
	if (!session.user.emailVerified)
		return NextResponse.redirect(new URL('/email-verify', request.url));

	// Require at least one organization (excluding onboarding route)
	if (url.startsWith('/onboarding')) return NextResponse.next();
	const hasOrg = await hasOneOrganization(session.user.id);
	return hasOrg ? NextResponse.next() : NextResponse.redirect(new URL('/onboarding', request.url));
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
