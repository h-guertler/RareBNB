'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Spots' },
      },
      review: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stars: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
