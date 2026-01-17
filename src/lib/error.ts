export function getErrorMessage(
	thrown: unknown,
	defaultMessage = 'An unknown error occurred',
): string {
	switch (typeof thrown) {
		case 'object': {
			if (thrown !== null && 'message' in thrown && typeof thrown.message === 'string') {
				return thrown.message;
			}
			break;
		}
		case 'string': {
			return thrown;
		}
	}
	return defaultMessage;
}
