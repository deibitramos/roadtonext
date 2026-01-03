import CardCompact from '@/components/CardCompact';
import OrganizationCreateForm from '@/features/organization/components/OrganizationCreateForm';

function OnboardingPage() {
	return (
		<div className="flex-1 flex flex-col justify-center items-center">
			<CardCompact
				title="Create Organization"
				description="Create an organization"
				className="w-full max-w-105 animate-fade-from-top"
			>
				<OrganizationCreateForm />
			</CardCompact>
		</div>
	);
}

export default OnboardingPage;
