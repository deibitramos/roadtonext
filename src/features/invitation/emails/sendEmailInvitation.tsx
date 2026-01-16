import EmailInvitation from '@/emails/invitation/EmailInvitation';
import { resend } from '@/lib/resend';

const sendEmailInvitation = async (
	username: string,
	organizationName: string,
	email: string,
	emailInvitationLink: string,
) => {
	return await resend.emails.send({
		from: 'no-reply@deibit.dev',
		to: email,
		subject: `Invitation to ${organizationName} from TicketBounty`,
		react: (
			<EmailInvitation
				fromUser={username}
				fromOrganization={organizationName}
				url={emailInvitationLink}
			/>
		),
	});
};

export default sendEmailInvitation;
