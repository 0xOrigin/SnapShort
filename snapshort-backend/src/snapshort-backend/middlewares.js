'use strict';

class BaseError extends Error {
  constructor(message, statusCode, isOperational) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

class AppError extends BaseError {
  constructor(message, statusCode = 500) {
    super(message, statusCode, true);
  }
}

class APIError extends BaseError {
  constructor(message, statusCode = 500) {
    super(message, statusCode, true);
  }
}

module.exports = BaseError;


