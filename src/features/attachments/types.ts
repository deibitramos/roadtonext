import type { Prisma } from '@/generated/prisma/client';

type AttachmentTicket = Prisma.TicketGetPayload<{
	select: { id: true; organizationId: true };
}>;

type AttachmentComment = Prisma.CommentGetPayload<{
	include: {
		ticket: {
			select: { id: true; organizationId: true };
		};
	};
}>;

export type AttachmentSubject = AttachmentTicket | AttachmentComment;

export const isTicket = (subject: AttachmentSubject): subject is AttachmentTicket => {
	return 'organizationId' in subject;
};

export const isComment = (subject: AttachmentSubject): subject is AttachmentComment => {
	return 'ticketId' in subject;
};
