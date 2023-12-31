'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notNull: true,
            notEmpty: true,
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('User');
  }
};
