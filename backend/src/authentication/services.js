const models = require('./models');
const utils = require('./utils');
const { AppError } = require('../config/error-handlers');


class UserService {

  constructor() {
    this.model = models.User;
  }

  list = async (req) => {
    const users = await this.model.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  };

  retrieve = async (req) => {
    const user = await this.model.findOne({
      where: {
        id: req.params.userId,
      },
      attributes: {
        exclude: ['password'],
      },
    });
    return user;
  };

  create = async (req) => {
    const user = await this.model.create(
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      },
      {
        returning: true,
        attributes: {
          exclude: ['password'],
        },
      },
    );
    if (user[0] === 0) throw new AppError('Validation error', 400);
    return user;
  };

  update = async (req) => {
    const user = await this.model.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.userId,
        },
        individualHooks: true,
        returning: true,
      },
    );
    if (user[0] === 0) throw new AppError('Not found', 404);
    return user[1][0];
  };

  destroy = async (req) => {
    const isDeleted = await this.model.destroy({
      where: {
        id: req.params.userId,
      },
    });
    if (!isDeleted) throw new AppError('Not found', 404);
    return null;
  };
}

class AuthService {

  constructor() {
    this.model = models.User;
  }

  login = async (req) => {
    const user = await this.model.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user || !(await utils.comparePassword(req.body.password, user.password)))
      throw new AppError('Invalid email or password', 400);
    const refreshToken = utils.generateRefreshToken(user);
    const accessToken = utils.generateAccessToken(user);
    return { refreshToken, accessToken };
  };
}

module.exports = {
  UserService,
  AuthService,
};
