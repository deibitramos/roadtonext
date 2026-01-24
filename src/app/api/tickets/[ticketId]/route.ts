import { revalidatePath } from 'next/cache';
import getCredentialByToken from '@/features/credential/queries/getCredentialByToken';
import getTicket from '@/features/ticket/queries/getTicket';
import prisma from '@/lib/prisma';

type ParamsObject = {
	params: Promise<{ ticketId: string }>;
};

export async function GET(_request: Request, { params }: ParamsObject) {
	const routeParams = await params;
	const ticket = await getTicket(routeParams.ticketId);
	return Response.json(ticket);
}

export async function DELETE({ headers }: Request, { params }: ParamsObject) {
	const { ticketId } = await params;
	const bearerToken = headers.get('Authorization')?.split(' ')[1];
	if (!bearerToken) return Response.json({ error: 'Unauthorized' }, { status: 401 });

	const credential = await getCredentialByToken(bearerToken);
	if (!credential) return Response.json({ error: 'Unauthorized' }, { status: 401 });

	const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
	if (!ticket) return Response.json({ error: 'Not found' }, { status: 404 });

	await prisma.$transaction([
		prisma.ticket.delete({ where: { id: ticketId } }),
		prisma.credential.update({ where: { id: credential.id }, data: { lastUsed: new Date() } }),
	]);

	revalidatePath('/tickets');
	return Response.json({ message: 'Ticket deleted' });
}
