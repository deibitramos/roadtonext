import { Body, Container, Head, Html, Section, Tailwind, Text } from '@react-email/components';

type Props = {
	toName: string;
	otp: string;
};

function EmailVerification({ toName, otp }: Props) {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body className="font-sans m-8 text-center">
					<Container>
						<Section>
							<Text>
								Hello {toName}, thank you for signing up! Please use the following verification code
								to verify your email address:
							</Text>
						</Section>
						<Section>
							<Text className="bg-gray-100 rounded text-black text-3xl font-bold tracking-widest p-4 m-2">
								{otp}
							</Text>
						</Section>
						<Section>
							<Text className="text-sm text-gray-600">
								This code will expire in 5 minutes. If you didn't request this code, you can safely
								ignore this email.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

EmailVerification.PreviewProps = {
	toName: 'David Ramos',
	otp: '123456',
};

export default EmailVerification;
