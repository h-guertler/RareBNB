'use strict';

const { SpotImage } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};

 // defines schema in options object
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
   await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: "spot1img.com/img1",
      preview: true,
    },
    {
      spotId: 2,
      url: "spot2img.com/img1",
      preview: true,
    },
    {
      spotId: 3,
      url: "spot3img.com/img1",
      preview: false,
    }
   ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["spot1img.com/img1", "spot2img.com/img1", "spot3img.com/img1"] },
    }, {});
  }
};
