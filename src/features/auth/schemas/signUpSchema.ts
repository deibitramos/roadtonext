import { z } from 'zod/v4';

const signUpSchema = z
	.object({
		name: z.string().min(1).max(191),
		email: z.email().min(1, 'Required').max(191),
		password: z.string().min(6).max(191),
		confirmPassword: z.string().min(6).max(191),
		// Honeypot field - should always be empty (bots auto-fill this)
		website: z.string().max(0, 'Invalid submission').optional(),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});

export type SignUpData = z.infer<typeof signUpSchema>;

export default signUpSchema;
