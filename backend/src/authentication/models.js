const { Sequelize, Model, DataTypes } = require('sequelize');
const { db } = require('../config/databases');
const utils = require('./utils');


class User extends Model { }

User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize: db,
    modelName: 'User',
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
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
});


module.exports = {
  User
};
