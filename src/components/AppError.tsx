import { getErrorMessage } from '@/lib/error';
import Placeholder from './Placeholder';

type Props = {
	error: unknown;
};

function AppError({ error }: Props) {
	const message = getErrorMessage(error);
	return <Placeholder label={message} />;
}

export default AppError;
