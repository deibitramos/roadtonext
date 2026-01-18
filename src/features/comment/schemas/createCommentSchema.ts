import { z } from 'zod/v4';

const createCommentSchema = z.object({
	content: z
		.string()
		.min(1, 'Content is required')
		.max(1024, 'Content must be at most 1024 characters'),
});

export type CreateCommentData = z.infer<typeof createCommentSchema>;

export default createCommentSchema;
