import { getErrorMessage } from 'react-error-boundary';
import Placeholder from './Placeholder';

type Props = {
	error: unknown;
};

function AppError({ error }: Props) {
	const message = getErrorMessage(error) ?? 'Something went wrong';
	return <Placeholder label={message} />;
}

export default AppError;
