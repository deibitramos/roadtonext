import isOwner from '@/features/auth/utils/isOwner';
import getUserMembership from '@/features/membership/actions/getUserMembership';
import { getSessionUserOrUndefined } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import type { ParsedSearchParams } from '../searchParams';

const getTickets = async (
	userId: string | undefined,
	searchParams: ParsedSearchParams,
	byOrganization: boolean,
) => {
	const user = await getSessionUserOrUndefined();
	const { organizations, activeMembershipId } = await getUserMembership(user?.id ?? '');

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

	const list = tickets.map((ticket) => {
		const owner = isOwner(user, ticket);
		const ticketOrganization = organizations.find((o) => o.id === ticket.organizationId);
		const { canDeleteTicket = false } = ticketOrganization || {};
		const permissions = { canDeleteTicket: owner && canDeleteTicket };
		return { ...ticket, owner, permissions };
	});

	return { list, metadata: { count, hasNextPage: count > skip + take } };
};

export default getTickets;
