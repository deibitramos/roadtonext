import { eventType, Inngest, staticSchema } from 'inngest';
import type { AttachmentEntity } from '@/generated/prisma/browser';

export type PasswordResetEventData = { email: string; url: string };
export type SignUpEventData = { email: string; otp: string };
export type InvitationSendEventData = {
	userId: string;
	organizationId: string;
	email: string;
	invitationLink: string;
};
export type AttachmentDeleteEventData = {
	attachmentId: string;
	organizationId: string;
	entity: AttachmentEntity;
	entityId: string;
	fileName: string;
};
export type OrganizationCreatedEventData = { organizationId: string; byEmail: string };

export const passwordResetEvent = eventType('app/password.password-reset', {
	schema: staticSchema<PasswordResetEventData>(),
});

export const signUpEvent = eventType('app/auth.sign-up', {
	schema: staticSchema<SignUpEventData>(),
});

export const invitationSendEvent = eventType('app/invitation.send', {
	schema: staticSchema<InvitationSendEventData>(),
});

export const attachmentDeleteEvent = eventType('app/attachment.delete', {
	schema: staticSchema<AttachmentDeleteEventData>(),
});

export const organizationCreatedEvent = eventType('app/organization.created', {
	schema: staticSchema<OrganizationCreatedEventData>(),
});

const inngest = new Inngest({
	id: 'road-to-next',
});

export default inngest;
