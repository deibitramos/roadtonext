'use server';

import { auth } from '@/lib/auth/server';
import { getSessionUserOrRedirect } from '@/lib/auth/session';

const resendVerificationCode = async () => {
	console.log('resending');
	const user = await getSessionUserOrRedirect();
	console.log('user', user);

	// Send verification OTP using Better Auth API
	const result = await auth.api.sendVerificationOTP({
		body: { email: user.email, type: 'email-verification' },
	});
	console.log('result', result);

	return result;
};

export default resendVerificationCode;
