import { z } from 'zod/v4';

const createOrganizationSchema = z.object({
	name: z.string().min(1).max(191),
});

export type CreateOrganizationData = z.infer<typeof createOrganizationSchema>;

export default createOrganizationSchema;
