declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			DATABASE_URL: string;
			DIRECT_URL: string;
			BETTER_AUTH_SECRET: string;
			RESEND_API_KEY: string;
			AWS_BUCKET_NAME: string;
			AWS_REGION: string;
			AWS_ACCESS_KEY_ID: string;
			AWS_SECRET_ACCESS_KEY: string;
			STRIPE_SECRET_KEY: string;
			STRIPE_WEBHOOK_SECRET: string;
			BETTER_AUTH_BASE_URL?: string;
			NEXT_PUBLIC_BASE_URL?: string;
		}
	}
}

export {};
