const getBaseUrl = () => {
	// Client-side: use window.location.origin
	if (typeof window !== 'undefined') return window.location.origin;

	// Server-side: check environment variables first (for production builds)
	if (process.env.BETTER_AUTH_BASE_URL) return process.env.BETTER_AUTH_BASE_URL;
	if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;

	// Fallback to localhost for development
	return 'http://localhost:3000';
};

export default getBaseUrl;
