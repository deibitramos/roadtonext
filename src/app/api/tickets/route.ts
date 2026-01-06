import getTickets from '@/features/ticket/queries/getTickets';
import { searchParamsCache } from '@/features/ticket/searchParams';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const untypedSearchParams = Object.fromEntries(searchParams);

	const typedSearchParams = searchParamsCache.parse(untypedSearchParams);
	const { list, metadata } = await getTickets(undefined, typedSearchParams, false);
	return Response.json({ list, metadata });
}
