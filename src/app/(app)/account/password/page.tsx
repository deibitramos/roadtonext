import Heading from '@/components/Heading';
import { AccountTabs } from '../_navigation/AccountTabs';

export default function PasswordPage() {
	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading title="Password" description="Keep your account secure" tabs={<AccountTabs />} />
		</div>
	);
}
