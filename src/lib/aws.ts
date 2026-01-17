import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
	throw new Error(
		'Missing AWS configuration. Please ensure AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY are set in your environment variables.',
	);
}

const s3 = new S3Client({
	region,
	credentials: {
		accessKeyId,
		secretAccessKey,
	},
});

export { s3 };
