const { toBoolean } = require("./utils");

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "url_shortener",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      ssl: toBoolean(process.env.DB_SSL) && {
        require: toBoolean(process.env.DB_SSL) || false,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "url_shortener",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      ssl: toBoolean(process.env.DB_SSL) && {
        require: toBoolean(process.env.DB_SSL) || false,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "url_shortener",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      ssl: toBoolean(process.env.DB_SSL) && {
        require: toBoolean(process.env.DB_SSL) || false,
        rejectUnauthorized: false,
      },
    },
  },
};
