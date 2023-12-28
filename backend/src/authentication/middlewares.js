const jwt = require('jsonwebtoken');
const status = require('../config/status-codes');
const { asyncErrorHandler, AppError } = require('../config/error-handlers');
const models = require('./models');


const authenticate = asyncErrorHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken || req.body?.accessToken;
  if (!accessToken)
    return next(
      new AppError('Authentication failed', status.HTTP_401_UNAUTHORIZED),
    );

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
    },
  );
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


module.exports = {
  authenticate,
};
