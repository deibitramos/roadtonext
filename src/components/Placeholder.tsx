import { MessageSquareWarningIcon } from 'lucide-react';
import type { ComponentType, PropsWithChildren } from 'react';

type Props = {
	label: string;
	icon?: ComponentType<{ className?: string }>;
};

function Placeholder(props: PropsWithChildren<Props>) {
	const { label, icon: Icon = MessageSquareWarningIcon, children } = props;
	return (
		<div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
			<Icon className="w-16 h-16" />
			<h2 className="text-lg text-center">{label}</h2>
			{children ? children : <div />}
		</div>
	);
}

export default Placeholder;
