'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Url', 'userId', {
      type: Sequelize.UUID,
      references: {
          model: 'User',
          key: 'id',
      },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Url', 'userId', {
      type: Sequelize.UUID,
      references: {
          model: 'User',
          key: 'id',
      },
      allowNull: true,
    });
  }
};
