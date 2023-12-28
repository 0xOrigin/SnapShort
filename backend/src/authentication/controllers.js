const models = require('./models');
const services = require('./services');
const BaseController = require('../config/base-controller');
const status = require('../config/status-codes');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const ms = require('ms');
const { generateAccessToken, generateRefreshToken } = require('./utils');
const { asyncErrorHandler, AppError } = require('../config/error-handlers');


class UserController extends BaseController {
  constructor() {
    super(models.User, services.UserService);
  }
}

class AuthController extends BaseController {

  constructor() {
    super(models.User, services.AuthService);
  }

  login = asyncErrorHandler(async (req, res, next) => {
    const { accessToken, refreshToken } = await this.service.login(req);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(constants.JWT_REFRESH_EXPIRES_IN),
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: ms(constants.JWT_ACCESS_EXPIRES_IN),
    });
    res.jsonResponse({ accessToken }, status.HTTP_200_OK, 'Success');
  });

  logout = (req, res, next) => {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.jsonResponse(null, status.HTTP_200_OK, 'Success');
  };
}


const handleRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  if (!refreshToken)
    return next(new AppError('No refresh token provided', status.HTTP_401_UNAUTHORIZED));

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err)
        throw new AppError('Invalid refresh token', status.HTTP_401_UNAUTHORIZED);
      return decoded;
    }
  );
  const user = await models.User.findOne({
    where: {
      id: decoded.id,
    },
  });
  if (!user)
    return next(new AppError('Invalid refresh token', status.HTTP_401_UNAUTHORIZED));

  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    maxAge: ms(constants.JWT_REFRESH_EXPIRES_IN),
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: ms(constants.JWT_ACCESS_EXPIRES_IN),
  });
  return res.jsonResponse({ accessToken }, status.HTTP_200_OK, 'Success');
};



module.exports = {
  UserController,
  AuthController,
  handleRefreshToken,
};
