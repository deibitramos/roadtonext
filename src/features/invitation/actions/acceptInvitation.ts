'use server';

import { hashPassword } from 'better-auth/crypto';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import prisma from '@/lib/prisma';
import { actionError } from '@/lib/types';

const acceptInvitation = async (tokenId: string) => {
	const tokenHash = await hashPassword(tokenId);
	const invitation = await prisma.invitation.findUnique({ where: { tokenHash } });
	if (!invitation) {
		return actionError('Revoked or invalid invitation token');
	}

	const user = await prisma.user.findUnique({ where: { email: invitation.email } });
	if (user) {
		await prisma.$transaction([
			prisma.invitation.delete({ where: { tokenHash } }),
			prisma.membership.create({
				data: {
					organizationId: invitation.organizationId,
					userId: user.id,
					role: 'MEMBER',
					isActive: false,
				},
			}),
		]);
	} else {
		await prisma.invitation.update({
			where: { tokenHash },
			data: { status: 'ACCEPTED_WITHOUT_ACCOUNT' },
		});
	}

	await setCookie('toast', 'Invitation accepted');
	redirect('/sign-in');
};

export default acceptInvitation;
