import getTicket from '@/features/ticket/queries/getTicket';

type ParamsObject = {
	params: Promise<{ ticketId: string }>;
};

export async function GET(_request: Request, { params }: ParamsObject) {
	const routeParams = await params;
	const ticket = await getTicket(routeParams.ticketId);
	return Response.json(ticket);
}
