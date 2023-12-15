class AppError extends Error {

  constructor(message, statusCode, isOperational=true) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

}


class ErrorHandler {

  constructor(logger) {
    this.logger = logger;
  }

  async logError(err) {
    this.logger.error(err);
  }

  isTrustedError(err) {
    return err instanceof AppError && err.isOperational;
  }
}


const logger = console;
const errorHandler = new ErrorHandler(logger);


asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(err => {
      next(new AppError(err.errors?.map(e => e.message), 400));
    });
  };
}


errorHandlerMiddleware = async(error, req, res, next) => {
  if (!errorHandler.isTrustedError(error))
    return next(error);

  await errorHandler.logError(error);
  error.statusCode = error.statusCode || 500;

  res.jsonResponse(error, error.statusCode);
};


nonOperationalErrorHandlerMiddleware = async(error, req, res, next) => {
  if (errorHandler.isTrustedError(error))
    return next(error);

  await errorHandler.logError(error);
  error.statusCode = 500;
  error.message = 'Something went wrong!';

  res.jsonResponse(error, error.statusCode);
};


uncaughtExceptionHandler = async(err, server) => {
  console.log('[!] UNCAUGHT EXCEPTION! Shutting down...');
  await errorHandler.logError(err);
  if (!errorHandler.isTrustedError(err)){
    server.close(() => {
      console.log('[!] Server closed...');
    });
    process.exit(1);
  }
};


unhandledRejectionHandler = async(err, server) => {
  console.log('[!] UNHANDLED REJECTION! Shutting down...');

  await errorHandler.logError(err);
  server.close(() => {
    console.log('[!] Server closed...');
  });
};


handleSIGTERM = (server) => {
  console.log('[!] SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('[+] Process terminated!');
  });
};


module.exports = {
  AppError,
  errorHandlerMiddleware,
  nonOperationalErrorHandlerMiddleware,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
  handleSIGTERM,
  asyncErrorHandler,
};
