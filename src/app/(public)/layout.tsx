import Header from '@/components/Header';
import Main from '@/components/Main';
import PublicNavButtons from '@/components/PublicNavButtons';

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
