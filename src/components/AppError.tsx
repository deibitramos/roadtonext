import Placeholder from './Placeholder';

type Props = {
	error: Error;
};

function AppError({ error }: Props) {
	return <Placeholder label={error.message || 'Something went wrong'} />;
}

export default AppError;
