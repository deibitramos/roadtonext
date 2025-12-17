import Header from '@/components/Header';
import Main from '@/components/Main';
import PrivateNavButtons from '@/components/PrivateNavButtons';

type Props = { children?: React.ReactNode };
export default function PrivateLayout({ children }: Props) {
	return (
		<>
			<Header>
				<PrivateNavButtons />
			</Header>
			<Main>{children}</Main>
		</>
	);
}
