import { generateRandomString, hashPassword } from 'better-auth/crypto';
import prisma from '@/lib/prisma';

async function generateCredential(organizationId: string, name: string) {
	const secret = generateRandomString(32);
	const secretHash = await hashPassword(secret);

	const credential = await prisma.credential.create({
		data: { organizationId, name, secretHash },
	});

	return `${credential.id}.${secret}`;
}

export default generateCredential;
