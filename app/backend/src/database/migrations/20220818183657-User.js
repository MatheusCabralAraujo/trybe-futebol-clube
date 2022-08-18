'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      password: {
        type: Sequelize.STRING(100),
      },
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('users');
  }
};
