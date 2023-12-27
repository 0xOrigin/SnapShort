const models = require('./models');
const services = require('./services');
const BaseController = require('./../config/base-controller');
const { asyncErrorHandler } = require('./../config/error-handlers');


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
    const token = await this.service.login(req);
    res.jsonResponse({ token }, 200);
  });
}

module.exports = {
  UserController,
  AuthController,
};
