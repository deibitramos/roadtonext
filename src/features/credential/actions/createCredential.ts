'use server';

import { revalidatePath } from 'next/cache';
import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';
import { getErrorMessage } from '@/lib/error';
import { actionError, actionSuccess } from '@/lib/types';
import type { CreateCredentialData } from '../schemas/createCredentialSchema';
import createCredentialSchema from '../schemas/createCredentialSchema';
import generateCredential from '../utils/generateCredential';

const createCredential = async (organizationId: string, data: CreateCredentialData) => {
	await getAdminOrRedirect(organizationId);

	let secret: string;

	try {
		const { name } = createCredentialSchema.parse(data);
		secret = await generateCredential(organizationId, name);

		// TODO: Create credential in database
	} catch (error) {
		return actionError(getErrorMessage(error));
	}

	revalidatePath(`/organization/${organizationId}/credentials`);
	return actionSuccess(`Copy the secret, we will not show it again:\n${secret}`);
};

export default createCredential;
