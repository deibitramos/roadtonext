import z from 'zod/v4';
import { sizeInMB } from '@/lib/size';
import { ACCEPTED, MAX_FILE_SIZE } from '../constants';

const refineSizeFn = (files: File[]) => files.every((file) => sizeInMB(file.size) <= MAX_FILE_SIZE);
const refineFileTypeFn = (files: File[]) => files.every((file) => ACCEPTED.includes(file.type));

export const getFilesSchema = (required: boolean) => {
	return z
		.array(z.instanceof(File))
		.min(required ? 1 : 0, 'At least one file is required')
		.refine(refineSizeFn, 'File size must be less than or equal to 4MB')
		.refine(refineFileTypeFn, 'File type is not supported');
};

export const getClientFilesSchema = (required: boolean) => {
	return z.object({
		files: z
			.custom<FileList>((val) => val instanceof FileList)
			.transform((files) => Array.from(files).filter((file) => file.size > 0))
			.pipe(getFilesSchema(required)),
	});
};

export const getServerFilesSchema = (required: boolean) => {
	return z.object({
		files: getFilesSchema(required),
	});
};

export type CreateAttachmentData = z.infer<ReturnType<typeof getServerFilesSchema>>;
