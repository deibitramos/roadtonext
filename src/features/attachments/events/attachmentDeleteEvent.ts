import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/lib/aws';
import inngest from '@/lib/inngest';
import generateS3Key from '../utils/generateS3Key';

const attachmentDeleteEvent = inngest.createFunction(
	{ id: 'attachment-delete' },
	{ event: 'app/attachment.delete' },
	async ({ event }) => {
		const { attachmentId, organizationId, ticketId, fileName } = event.data;

		try {
			const key = generateS3Key({ organizationId, ticketId, fileName, attachmentId });
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
