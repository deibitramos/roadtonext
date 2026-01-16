'use server';

import { revalidatePath } from 'next/cache';
import { getErrorMessage } from 'react-error-boundary';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { actionError, actionSuccess } from '@/lib/types';

const switchOrganization = async (organizationId: string) => {
	const user = await getSessionUserOrRedirect({ skipActiveOrgCheck: true });

	const membership = await prisma.membership.findFirst({
		where: { organizationId, userId: user.id },
	});
	if (!membership) return actionError('Not a member of this organization');

	try {
		await prisma.$transaction([
			prisma.membership.updateMany({
				where: { userId: user.id, organizationId: { not: organizationId } },
				data: { isActive: false },
			}),
			prisma.membership.update({
				where: { userId_organizationId: { userId: user.id, organizationId } },
				data: { isActive: true },
			}),
		]);

		revalidatePath('/organization');
		return actionSuccess();
	} catch (error) {
		const message = getErrorMessage(error) ?? 'Failed to switch organization';
		return actionError(message);
	}
};

export default switchOrganization;
