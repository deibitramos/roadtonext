import PublicNavButtons from '@/components/PublicNavButtons';
import Header from '../_navigation/Header';
import Main from '../_navigation/Main';

type Props = { children?: React.ReactNode };
export default function PublicLayout({ children }: Props) {
	return (
		<>
			<Header>
				<PublicNavButtons />
			</Header>
			<Main>{children}</Main>
		</>
	);
}
