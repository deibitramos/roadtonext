'use client';

import AppError from '@/components/AppError';

export default function ErrorPage({ error }: { error: Error }) {
	return <AppError error={error} />;
}
