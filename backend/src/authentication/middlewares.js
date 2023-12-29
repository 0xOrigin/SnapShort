const jwt = require('jsonwebtoken');
const status = require('../config/status-codes');
const { asyncErrorHandler, AppError } = require('../config/error-handlers');
const models = require('./models');


// This middleware is used to optionally authenticate a user
const authenticate = asyncErrorHandler(async (req, res, next) => {
  let accessToken;
  if (req.headers?.authorization) {
    accessToken = req.headers.authorization.split(' ')[1];
  } else {
    accessToken = req.cookies?.accessToken;
  }
  if (!accessToken) return next();

  const decoded = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err)
        throw new AppError(
          'Invalid access token',
          status.HTTP_401_UNAUTHORIZED,
        );
      return decoded;
  });
  const user = await models.User.findOne({
    where: {
      id: decoded.id,
    },
  });
  if (!user)
    return next(
      new AppError('Invalid access token', status.HTTP_401_UNAUTHORIZED),
    );

  req.user = user;
  next();
});

const isAuthenticated = (req, res, next) => {
  if (!req.user)
    return next(
      new AppError('Authentication credentials were not provided.', status.HTTP_401_UNAUTHORIZED),
    );
  next();
};


module.exports = {
  authenticate,
  isAuthenticated,
};
