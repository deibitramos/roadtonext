import Sidebar from './sidebar/components/Sidebar';

type Props = { children?: React.ReactNode };

function AuthenticatedContainer({ children }: Props) {
	return (
		<div className="flex h-screen overflow-hidden border-collapse">
			<Sidebar />
			{children}
		</div>
	);
}

export default AuthenticatedContainer;
