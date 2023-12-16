const sequelize = require('sequelize');
const utils = require('./utils');
const { db } = require('./../snapshort-backend/databases');

const User = db.define(
  'User',
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    lastLogin: {
      type: sequelize.DATE,
      allowNull: true,
    },
    isActive: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isVerified: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: sequelize.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: sequelize.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
    hooks: {
      beforeCreate: async function (user) {
        user.password = await utils.hashPassword(user.password);
      },
      beforeUpdate: async function (user) {
        if (user.changed('password'))
          user.password = await utils.hashPassword(user.password);
      },
      afterCreate: async function (user) {
        delete user.dataValues.password;
      },
      afterUpdate: async function (user) {
        delete user.dataValues.password;
      },
    },
  },
);

User.sync({ alter: true })
  .then(() => {
    console.log('User table created');
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = {
  User
};

