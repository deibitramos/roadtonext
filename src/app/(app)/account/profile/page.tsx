import Heading from '@/components/Heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSessionUserOrRedirect } from '@/lib/auth/session';
import { cn } from '@/lib/utils';
import { AccountTabs } from '../_navigation/AccountTabs';

function DataCell({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-y-1">
			<span className="text-sm text-muted-foreground">{label}</span>
			<span className="font-medium">{value}</span>
		</div>
	);
}

function ActiveBadge() {
	return (
		<span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Active</span>
	);
}

export default async function ProfilePage() {
	const user = await getSessionUserOrRedirect();

	return (
		<div className="flex-1 flex flex-col gap-y-8">
			<Heading title="Profile" description="All your profile information" tabs={<AccountTabs />} />

			<div className="flex flex-col gap-y-6 px-8">
				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
						<CardDescription>Your personal details</CardDescription>
					</CardHeader>
					<CardContent className="grid grid-cols-3 gap-4">
						<DataCell label="Name" value={user.name} />
						<DataCell label="Email" value={user.email} />
						<DataCell label="Email Verified" value={user.emailVerified ? 'Yes' : 'No'} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Organization Memberships</CardTitle>
						<CardDescription>Organizations you belong to</CardDescription>
					</CardHeader>
					<CardContent>
						{user.organizations.length === 0 ? (
							<p className="text-sm text-muted-foreground">No organization memberships</p>
						) : (
							<ul className="flex flex-col gap-y-2">
								{user.organizations.map((org) => {
									const isActive = org.id === user.activeMembershipId;
									const classNames = cn(
										'flex items-center justify-between rounded-lg border px-4 py-3',
										isActive && 'border-primary bg-primary/5',
									);

									return (
										<li key={org.id} className={classNames}>
											<span className="font-medium">{org.name}</span>
											{isActive && <ActiveBadge />}
										</li>
									);
								})}
							</ul>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
