'use server';

import { verifyPassword } from 'better-auth/crypto';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookies';
import prisma from '@/lib/prisma';
import { actionError } from '@/lib/types';

const acceptInvitation = async (id: string, tokenId: string) => {
	const invitation = await prisma.invitation.findUnique({ where: { id } });
	if (!invitation) {
		return actionError('Revoked or invalid invitation token');
	}

	const isValid = await verifyPassword({ hash: invitation.tokenHash, password: tokenId });
	if (!isValid) {
		return actionError('Revoked or invalid invitation token');
	}

	const user = await prisma.user.findUnique({ where: { email: invitation.email } });
	const userExists = !!user;
	if (userExists) {
		await prisma.$transaction([
			prisma.invitation.delete({ where: { id } }),
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
			where: { id },
			data: { status: 'ACCEPTED_WITHOUT_ACCOUNT' },
		});
	}

	await setCookie('toast', 'Invitation accepted');

	redirect(userExists ? '/sign-in' : '/sign-up');
};

export default acceptInvitation;
