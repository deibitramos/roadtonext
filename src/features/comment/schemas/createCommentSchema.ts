import { z } from 'zod/v4';
import {
	getClientFilesSchema,
	getServerFilesSchema,
} from '@/features/attachments/schemas/createAttachmentSchema';

export const getCommentSchema = (clientSide: boolean) => {
	const filesSchema = clientSide
		? getClientFilesSchema(false).shape.files
		: getServerFilesSchema(false).shape.files;

	return z.object({
		content: z
			.string()
			.min(1, 'Content is required')
			.max(1024, 'Content must be at most 1024 characters'),
		files: filesSchema,
	});
};

export type CreateCommentData = z.infer<ReturnType<typeof getCommentSchema>>;
