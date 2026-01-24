import { verifyPassword } from 'better-auth/crypto';
import prisma from '@/lib/prisma';

const getCredentialByToken = async (token: string) => {
	const [credentialId, secret] = token.split('.');
	if (!credentialId || !secret) return null;

	const credential = await prisma.credential.findUnique({ where: { id: credentialId } });
	if (!credential) return null;

	const isValid = await verifyPassword({ hash: credential.secretHash, password: secret });
	return isValid ? credential : null;
};

export default getCredentialByToken;
