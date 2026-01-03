'use server';

import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import { auth } from '@/lib/auth/server';
import { getSessionUserOrRedirect } from '@/lib/auth/session';

const verifyEmail = async (otp: string) => {
	// Get user from session without checking email verification or organization
	const user = await getSessionUserOrRedirect({
		skipEmailVerification: true,
		skipOrganizationCheck: true,
	});

	// Verify email using Better Auth API
	const result = await auth.api.verifyEmailOTP({
		body: { email: user.email, otp },
	});

	if (!result) {
		throw new Error('Failed to verify email');
	}

	await setCookie('toast', 'Email verified successfully!');
	redirect('/tickets');
};

export default verifyEmail;
