import { serve } from 'inngest/next';
import eventSignUp from '@/features/auth/events/eventSignUp';
import eventPasswordReset from '@/features/password/events/eventPasswordReset';
import inngest from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [eventPasswordReset, eventSignUp],
});
