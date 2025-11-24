'use client';

import type { PropsWithChildren } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import AppError from './AppError';

function ErrorBoundary({ children }: PropsWithChildren) {
	return <ReactErrorBoundary FallbackComponent={AppError}>{children}</ReactErrorBoundary>;
}

export default ErrorBoundary;
