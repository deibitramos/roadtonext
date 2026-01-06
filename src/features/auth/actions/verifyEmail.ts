'use server';

import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import { auth } from '@/lib/auth/server';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { actionError } from '@/lib/types';

const verifyEmail = async (otp: string) => {
	// Get user from session without checking email verification or organization
	const user = await getSessionUserOrRedirect({
		skipEmailVerify: true,
		skipHasOrgCheck: true,
		skipActiveOrgCheck: true,
	});

	// Verify email using Better Auth API
	const result = await auth.api.verifyEmailOTP({
		body: { email: user.email, otp },
	});

	if (!result) {
		return actionError('Failed to verify email');
	}

	await setCookie('toast', 'Email verified successfully!');
	redirect('/tickets');
};

export default verifyEmail;
