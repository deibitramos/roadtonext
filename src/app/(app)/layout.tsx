import AccountDropdown from '../_navigation/AccountDropdown';
import AuthenticatedContainer from '../_navigation/AuthContainer';
import Header from '../_navigation/Header';
import Main from '../_navigation/Main';

type Props = { children?: React.ReactNode };
export default async function PrivateLayout({ children }: Props) {
	return (
		<>
			<Header>
				<AccountDropdown />
			</Header>
			<AuthenticatedContainer>
				<Main>{children}</Main>
			</AuthenticatedContainer>
		</>
	);
}
