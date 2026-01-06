import isOwner from '@/features/auth/utils/isOwner';
import hasMembership from '@/features/organization/queries/hasMembership';
import { getSessionUserOrUndefined } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import type { ParsedSearchParams } from '../searchParams';

const getTickets = async (
	userId: string | undefined,
	searchParams: ParsedSearchParams,
	byOrganization: boolean,
) => {
	const user = await getSessionUserOrUndefined();
	const { activeMembershipId } = await hasMembership(user?.id ?? '');

	const { search, sortKey, sortValue } = searchParams;

	const where = {
		userId: userId ?? undefined,
		title: { contains: search, mode: 'insensitive' },
		...(byOrganization && activeMembershipId ? { organizationId: activeMembershipId } : {}),
	} as const;

	const take = searchParams.size;
	const skip = searchParams.page * searchParams.size;

	const [tickets, count] = await prisma.$transaction([
		prisma.ticket.findMany({
			where,
			skip,
			take,
			orderBy: { [sortKey]: sortValue },
			include: { user: { select: { name: true } } },
		}),
		prisma.ticket.count({ where }),
	]);

	return {
		list: tickets.map((ticket) => ({ ...ticket, owner: isOwner(user, ticket) })),
		metadata: { count, hasNextPage: count > skip + take },
	};
};

export default getTickets;
