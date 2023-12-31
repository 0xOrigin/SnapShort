'use strict';
const shortid = require('shortid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Url', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        userId: {
          type: Sequelize.UUID,
          references: {
              model: 'User',
              key: 'id'
          },
          allowNull: true
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isUrl: true,
            notNull: true,
            notEmpty: true,
          }
        },
        urlCode: {
          type: Sequelize.STRING,
          defaultValue: shortid.generate,
          unique: true,
          allowNull: false
        },
        clicks: {
          type: Sequelize.BIGINT,
          defaultValue: 0
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
            fields: ['urlCode']
          },
          {
            fields: ['userId']
          }
        ],
      }
    );
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Url');
  }
};
