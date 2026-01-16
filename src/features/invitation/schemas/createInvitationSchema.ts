import { z } from 'zod/v4';

const createInvitationSchema = z.object({
	email: z.email().min(1, 'Required').max(191),
});

export type CreateInvitationData = z.infer<typeof createInvitationSchema>;

export default createInvitationSchema;
