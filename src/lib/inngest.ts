import { EventSchemas, Inngest } from 'inngest';
import type { AttachmentEntity } from '@/generated/prisma/browser';

type Events = {
	'app/password.password-reset': { data: { email: string; url: string } };
	'app/auth.sign-up': { data: { email: string; otp: string } };
	'app/invitation.send': {
		data: { userId: string; organizationId: string; email: string; invitationLink: string };
	};
	'app/attachment.delete': {
		data: {
			attachmentId: string;
			organizationId: string;
			entity: AttachmentEntity;
			entityId: string;
			fileName: string;
		};
	};
};

const inngest = new Inngest({
	id: 'road-to-next',
	schemas: new EventSchemas().fromRecord<Events>(),
});

export default inngest;
