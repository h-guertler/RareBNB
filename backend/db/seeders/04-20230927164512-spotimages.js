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
   // 1:
   // 2:
   // 3:
   await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBag_End&psig=AOvVaw2_s-hxi1z2u37iu686BZfq&ust=1700090084647000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNCBuZ_PxIIDFQAAAAAdAAAAABAJ",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://i.pinimg.com/originals/53/05/fa/5305fa41cd55ec7ddf9ea7e3561275d0.jpg",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://static.wikia.nocookie.net/narnia/images/6/6e/Wardrobe.jpg/revision/latest?cb=20161029215350",
      preview: true,
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
