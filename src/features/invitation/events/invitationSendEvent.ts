import inngest, { invitationSendEvent as invitationSendEventTrigger } from '@/lib/inngest';
import prisma from '@/lib/prisma';
import sendEmailInvitation from '../emails/sendEmailInvitation';

const invitationSendEvent = inngest.createFunction(
	{ id: 'invitation-send', triggers: [invitationSendEventTrigger] },
	async ({ event }) => {
		const { userId, organizationId, email, invitationLink } = event.data;

		const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
		const organization = await prisma.organization.findUniqueOrThrow({
			where: { id: organizationId },
		});

		const result = await sendEmailInvitation(user.name, organization.name, email, invitationLink);

		if (result.error) {
			throw new Error(`${result.error.name}: ${result.error.message}`);
		}

		return { event, body: true };
	},
);

export default invitationSendEvent;
