export const formatAxiosError = (e, defaultMessage) => {
	const error = e.response?.data || null;

	return {
		message: e.message || defaultMessage,
		data: {
			form: error?.error || null,
			error: {
				file: error?.trace[0]?.file || null,
				line: error?.trace[0]?.line || null,
				message: error.message,
			},
		},
		code: e.code || null,
	};
};

export default formatAxiosError;
