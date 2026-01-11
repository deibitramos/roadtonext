'use server';

import { auth } from '@/lib/auth/server';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { actionError, actionSuccess } from '@/lib/types';

const resendVerificationCode = async () => {
	const user = await getSessionUserOrRedirect({
		skipEmailVerify: true,
		skipHasOrgCheck: true,
		skipActiveOrgCheck: true,
	});

	// Send verification OTP using Better Auth API
	const result = await auth.api.sendVerificationOTP({
		body: { email: user.email, type: 'email-verification' },
	});

	if (!result) {
		return actionError('Failed to send verification code');
	}

	return actionSuccess();
};

export default resendVerificationCode;
