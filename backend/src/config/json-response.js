
module.exports.jsonResponseMiddleware = (req, res, next) => {
	res.jsonResponse = (data, statusCode=200, message='Success', pagination=null) => {

		let response = {
			status: statusCode,
			message: message,
			pagination: pagination,
			data: data instanceof Array ? data : [data],
			error: null
		}

		if (statusCode === 204) {
			return res.status(statusCode).end();
		}

		if (statusCode >= 400) {
			errorShape = {
				message: data.message,
				stackTrace: data.stack,
				error: data
			}
			
			if (process.env.NODE_ENV === 'production') {
				delete errorShape.stackTrace
				delete errorShape.error
			}
			
			response.message = 'Fail'
			response.data = null
			response.error = [errorShape]
		}

		return res.status(statusCode).json(response);
	};

	next();
};
