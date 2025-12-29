'use server';

import inngest from '@/lib/inngest';

const resetPassword = async (email: string) => {
	// Better Auth has its own api, but I added the server action to demonstrate Inngest usage
	await inngest.send({ name: 'app/password.password-reset', data: { email } });
};

export default resetPassword;
