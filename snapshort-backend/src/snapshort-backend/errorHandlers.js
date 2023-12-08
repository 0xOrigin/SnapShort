class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports.AppError = AppError;


module.exports.asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(err => next(new AppError(err.message, 500)));
  };
}


module.exports.errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.jsonResponse(error, error.statusCode);
};


module.exports.uncaughtExceptionHandler = (err) => {
  console.log('[!] UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
};


module.exports.unhandledRejectionHandler = (err, server) => {
  console.log('[!] UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    console.log('[!] Server closed...');
  });
};


module.exports.handleSIGTERM = (server) => {
  console.log('[!] SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('[+] Process terminated!');
  });
};
