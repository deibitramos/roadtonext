import { EventSchemas, Inngest } from 'inngest';

type Events = {
	'app/password.password-reset': { data: { email: string; url: string } };
	'app/auth.sign-up': { data: { email: string; otp: string } };
};

const inngest = new Inngest({
	id: 'road-to-next',
	schemas: new EventSchemas().fromRecord<Events>(),
});

export default inngest;
