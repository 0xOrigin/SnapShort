const SALT_ROUNDS = 10;
const SECRET_KEY = process.env.SECRET_KEY || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';


module.exports = {
    SALT_ROUNDS,
    SECRET_KEY,
    JWT_EXPIRES_IN
};
