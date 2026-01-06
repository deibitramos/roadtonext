'use server';

import { revalidatePath } from 'next/cache';
import getAdminOrRedirect from '@/features/membership/queries/getAdminOrRedirect';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';

const deleteOrganization = async (organizationId: string) => {
	const user = await getAdminOrRedirect(organizationId);

	try {
		const membership = await prisma.membership.findFirst({
			where: { organizationId, userId: user.id },
		});
		if (!membership) return actionError('Not a member of this organization');

		await prisma.organization.delete({ where: { id: organizationId } });
	} catch (error) {
		const message = error instanceof Error ? error.message : 'An unknown error occurred';
		return actionError(message);
	}

	revalidatePath('/organization');
	return actionSuccess();
};

export default deleteOrganization;
