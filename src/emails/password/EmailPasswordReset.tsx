import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

type Props = {
	toName: string;
	url: string;
};

function EmailPasswordReset({ toName, url }: Props) {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body className="font-sans m-8 text-center">
					<Container>
						<Section>
							<Text>
								Hello {toName}, you have requested to reset your password. Click the button below to
								proceed:
							</Text>
						</Section>
						<Section>
							<Button href={url} className="bg-black rounded text-white p-2 m-2">
								Reset Password
							</Button>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

EmailPasswordReset.PreviewProps = {
	toName: 'David Ramos',
	url: 'http://localhost:3000/api/auth/reset-password/eEefgwcNtGqHLvAma16JO8AB?callbackURL=http%3A%2F%2Flocalhost%3A3000%2Freset-password',
};

export default EmailPasswordReset;
