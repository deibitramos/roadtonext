import { z } from 'zod/v4';

const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(6).max(191),
		password: z.string().min(6).max(191),
		confirmPassword: z.string().min(6).max(191),
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

export default changePasswordSchema;
