const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');


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
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: constants.JWT_ACCESS_EXPIRES_IN,
    },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: constants.JWT_REFRESH_EXPIRES_IN,
    },
  );
}


module.exports = {
  getSalt,
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
};
