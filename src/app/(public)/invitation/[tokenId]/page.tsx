import CardCompact from '@/components/CardCompact';
import InvitationAcceptButton from '@/features/invitation/components/InvitationAcceptButton';

type Props = {
	params: Promise<{
		tokenId: string;
	}>;
};

async function InvitationPage({ params }: Props) {
	const { tokenId } = await params;

	return (
		<div className="flex-1 flex flex-col justify-center items-center">
			<CardCompact
				title="Invitation to Organization"
				description="Accept the invitation to join the organization"
				className="w-full max-w-105 animate-fade-from-top"
			>
				<InvitationAcceptButton tokenId={tokenId} />
			</CardCompact>
		</div>
	);
}

export default InvitationPage;
