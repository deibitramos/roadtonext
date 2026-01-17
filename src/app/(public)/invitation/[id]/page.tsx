import CardCompact from '@/components/CardCompact';
import InvitationAcceptButton from '@/features/invitation/components/InvitationAcceptButton';

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ token: string }>;
};

async function InvitationPage({ params, searchParams }: Props) {
	const { id } = await params;
	const { token } = await searchParams;

	return (
		<div className="flex-1 flex flex-col justify-center items-center">
			<CardCompact
				title="Invitation to Organization"
				description="Accept the invitation to join the organization"
				className="w-full max-w-105 animate-fade-from-top"
			>
				<InvitationAcceptButton id={id} tokenId={token} />
			</CardCompact>
		</div>
	);
}

export default InvitationPage;
