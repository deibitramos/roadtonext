import { z } from 'zod/v4';

const emailVerifySchema = z.object({
	code: z.string().min(1, 'Required').max(8),
});

export default emailVerifySchema;
