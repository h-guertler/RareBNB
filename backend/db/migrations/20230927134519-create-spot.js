'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lat: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      lng: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      avgRating: {
        type: Sequelize.DECIMAL
      },
      previewImage: {
        type: Sequelize.STRING
      },
      numReviews: {
        type: Sequelize.INTEGER
      },
      SpotImages: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
      Owner: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('Spots');
  }
};
