const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('./../snapshort-backend/constants');

const getSalt = async () => {
  return await bcrypt.genSalt(constants.SALT_ROUNDS);
};

const hashPassword = async (password) => {
  const salt = await getSalt();
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    constants.SECRET_KEY,
    {
      expiresIn: constants.JWT_EXPIRES_IN,
    },
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, constants.SECRET_KEY);
};

module.exports = {
  getSalt,
  hashPassword,
  comparePassword,
  generateAccessToken,
  verifyToken,
};
