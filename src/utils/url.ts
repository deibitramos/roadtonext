const getBaseUrl = () => {
	return typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
};

export default getBaseUrl;
