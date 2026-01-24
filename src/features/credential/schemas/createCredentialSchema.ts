import { z } from 'zod/v4';

const createCredentialSchema = z.object({
	name: z.string().min(1).max(191),
});

export type CreateCredentialData = z.infer<typeof createCredentialSchema>;

export default createCredentialSchema;
