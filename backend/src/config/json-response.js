module.exports.jsonResponseMiddleware = (req, res, next) => {
  res.jsonResponse = (
    data,
    statusCode = 200,
    message = 'Success',
    pagination = null,
  ) => {
    let response = {
      status: statusCode,
      message: message,
      pagination: pagination,
      data: data,
      errors: null,
    };

    if (statusCode === 204) {
      return res.status(statusCode).end();
    }

    if (statusCode >= 400) {
      errorShape = {
        message: data.message,
      };
      // if (data.errors) {
      //   errorShape.errors = data.errors;
      // }

      response.message = 'Fail';
      response.data = null;
      response.errors = [errorShape];
    }

    return res.status(statusCode).json(response);
  };

  next();
};
