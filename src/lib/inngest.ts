import { EventSchemas, Inngest } from 'inngest';

type PasswordResetEvent = {
	data: {
		email: string;
	};
};

type Events = {
	'app/password.password-reset': PasswordResetEvent;
};

const inngest = new Inngest({
	id: 'road-to-next',
	schemas: new EventSchemas().fromRecord<Events>(),
});

export default inngest;
