import PublicNavButtons from '@/components/PublicNavButtons';
import { isAuthenticated } from '@/lib/auth/session';
import AccountDropdown from '../_navigation/AccountDropdown';
import AuthenticatedContainer from '../_navigation/AuthContainer';
import Header from '../_navigation/Header';
import Main from '../_navigation/Main';

type Props = { children?: React.ReactNode };
export default async function HomeLayout({ children }: Props) {
	const isAuth = await isAuthenticated();
	console.log('isAuth', isAuth);
	return (
		<>
			<Header>{isAuth ? <AccountDropdown /> : <PublicNavButtons />}</Header>
			{isAuth ? (
				<AuthenticatedContainer>
					<Main>{children}</Main>
				</AuthenticatedContainer>
			) : (
				<Main>{children}</Main>
			)}
		</>
	);
}
