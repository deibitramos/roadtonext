import { generateRandomString, hashPassword } from 'better-auth/crypto';
import prisma from '@/lib/prisma';
import getBaseUrl from '@/utils/url';

const generateInvitationLink = async (
	invitedByUserId: string,
	organizationId: string,
	email: string,
) => {
	await prisma.invitation.deleteMany({ where: { email, organizationId } });

	const tokenId = generateRandomString(32);
	const tokenHash = await hashPassword(tokenId);

	await prisma.invitation.create({
		data: { tokenHash, invitedByUserId, organizationId, email },
	});

	return `${getBaseUrl()}/invitation/${tokenId}`;
};

export default generateInvitationLink;
