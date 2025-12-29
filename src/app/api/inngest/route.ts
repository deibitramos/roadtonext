import { serve } from 'inngest/next';
import passwordResetEvent from '@/features/password/events/eventPasswordReset';
import inngest from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [passwordResetEvent],
});
