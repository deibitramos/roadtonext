'use server';

import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import { auth } from '@/lib/auth/server';
import prisma from '@/lib/prisma';
import { actionError } from '@/lib/types';
import type { SignUpData } from '../schemas/signUpSchema';
import signUpSchema from '../schemas/signUpSchema';

const signUp = async (data: SignUpData) => {
	const parsedData = signUpSchema.safeParse(data);
	if (!parsedData.success) {
		return actionError(parsedData.error.issues[0]?.message || 'Invalid data');
	}

	const { name, email, password, website } = parsedData.data;

	// Honeypot check - bots auto-fill all fields including hidden ones
	if (website) return actionError('Invalid submission');

	const result = await auth.api.signUpEmail({ body: { name, email, password } });
	if (!result) {
		return actionError('Failed to sign up');
	}

	await reviewInvitations(result.user.id, email);

	await setCookie('toast', 'Account created! Please check your email for verification code.');
	redirect('/email-verify');
};

const reviewInvitations = async (userId: string, email: string) => {
	const invitations = await prisma.invitation.findMany({ where: { email } });

	if (invitations.length > 0) {
		await prisma.$transaction([
			prisma.invitation.deleteMany({ where: { email } }),
			prisma.membership.createMany({
				data: invitations.map((invitation) => ({
					organizationId: invitation.organizationId,
					userId,
					role: 'MEMBER',
					isActive: false,
				})),
			}),
		]);
	}
};

export default signUp;
