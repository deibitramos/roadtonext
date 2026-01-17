import z from 'zod/v4';
import { sizeInMB } from '@/lib/size';
import { ACCEPTED, MAX_FILE_SIZE } from '../constants';

const refineSizeFn = (files: File[]) => files.every((file) => sizeInMB(file.size) <= MAX_FILE_SIZE);
const refineFileTypeFn = (files: File[]) => files.every((file) => ACCEPTED.includes(file.type));

// Base schema for File[] validation (shared between client and server)
const filesArraySchema = z
	.array(z.instanceof(File))
	.min(1, 'At least one file is required')
	.refine(refineSizeFn, 'File size must be less than or equal to 4MB')
	.refine(refineFileTypeFn, 'File type is not supported');

// Client-side schema: validates FileList and transforms to File[]
const createAttachmentSchema = z.object({
	files: z
		.custom<FileList>((val) => val instanceof FileList)
		.transform((files) => Array.from(files).filter((file) => file.size > 0))
		.pipe(filesArraySchema),
});

// Server-side schema: validates File[] (after client-side transform)
export const createAttachmentServerSchema = z.object({
	files: filesArraySchema,
});

export type CreateAttachmentData = z.infer<typeof createAttachmentSchema>;

export default createAttachmentSchema;
