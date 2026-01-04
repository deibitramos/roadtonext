'use server';

import { revalidatePath } from 'next/cache';
import { fromErrorToActionState, toActionState } from '@/components/form/utils/toActionState';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

const deleteOrganization = async (organizationId: string) => {
	const user = await getSessionUserOrRedirect();

	try {
		const membership = await prisma.membership.findFirst({
			where: { organizationId, userId: user.id },
		});
		if (!membership) return toActionState('Not a member of this organization', 'ERROR');

		await prisma.organization.delete({ where: { id: organizationId } });
	} catch (error) {
		return fromErrorToActionState(error);
	}

	revalidatePath('/organization');
	return toActionState('Organization has been deleted');
};

export default deleteOrganization;
