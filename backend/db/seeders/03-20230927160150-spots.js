'use strict';

const { Spot } = require("../models");
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
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: "123 Bag End Way",
      city: "Hobbiton",
      state: "Westfarthing",
      country: "The Shire",
      lat: 12.34,
      lng: 56.78,
      name: "No Admittance Except on Party Business",
      description: "Cozy interior and large kitchen space",
      price: 90.00,
    },
    {
      ownerId: 2,
      address: "99 Kingsroad North",
      city: "Winterfell",
      state: "Kingdom of the North",
      country: "Westeros",
      lat: 99.99,
      lng: 88.88,
      name: "The Great Hall",
      description: "High adventure and high altitude await",
      price: 60.00,
    },
    {
      ownerId: 3,
      address: "123 Country Lane",
      city: "Magikton",
      state: "North Yorkshire",
      country: "England",
      lat: 11.11,
      lng: 22.22,
      name: "The Wardrobe",
      description: "It's bigger on the inside",
      price: 50.00,
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
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["No Admittance Except on Party Business",
                        "The Great Hall",
                        "The Wardrobe"] },
    }, {});
  }
};
