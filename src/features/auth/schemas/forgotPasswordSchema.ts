import { z } from 'zod/v4';

const signInSchema = z.object({
	email: z.email().min(1, 'Required').max(191),
});

export default signInSchema;
