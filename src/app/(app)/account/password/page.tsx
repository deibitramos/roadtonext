import CardCompact from '@/components/CardCompact';
import Heading from '@/components/Heading';
import ChangePasswordForm from '@/features/password/components/ChangePasswordForm';
import { AccountTabs } from '../_navigation/AccountTabs';

export default function PasswordPage() {
	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading title="Password" description="Keep your account secure" tabs={<AccountTabs />} />
			<div className="flex flex-1 flex-col items-center">
				<CardCompact
					title="Change Password"
					description="Enter your current and new password to update it"
					className="w-full max-w-105 self-center animate-fade-from-top"
				>
					<ChangePasswordForm />
				</CardCompact>
			</div>
		</div>
	);
}
