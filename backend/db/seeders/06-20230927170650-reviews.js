'use strict';

const { Review } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Review.bulkCreate([
    {
      userId: 2,
      spotId: 1,
      review: "Beautiful area, though a bit warm for my liking.",
      stars: 4,
    },
    {
      userId: 1,
      spotId: 2,
      review: "A welcome vacation from a summer as hot as Mordor.",
      stars: 5,
    },
    {
      userId: 2,
      spotId: 3,
      review: "Quaint area, though the host's 4 children were constantly popping in and out.",
      stars: 3,
    },
   ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Review";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] },
    }, {});
  }
};
