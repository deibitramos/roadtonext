import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/lib/aws';
import inngest, { attachmentDeleteEvent as attachmentDeleteEventTrigger } from '@/lib/inngest';
import generateS3Key from '../utils/generateS3Key';

const attachmentDeleteEvent = inngest.createFunction(
	{ id: 'attachment-delete', triggers: [attachmentDeleteEventTrigger] },
	async ({ event }) => {
		const { attachmentId, organizationId, entity, entityId, fileName } = event.data;

		try {
			const key = generateS3Key({ organizationId, entity, entityId, fileName, attachmentId });
			const deleteData = { Bucket: process.env.AWS_BUCKET_NAME, Key: key };
			await s3.send(new DeleteObjectCommand(deleteData));
		} catch (error) {
			console.log(error);
			return { event, body: false };
		}

		return { event, body: true };
	},
);

export default attachmentDeleteEvent;
