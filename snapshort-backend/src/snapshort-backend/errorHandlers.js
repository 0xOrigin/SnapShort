module.exports.errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.jsonResponse(error.message, error.statusCode);
};
