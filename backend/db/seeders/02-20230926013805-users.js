'use strict';

const { User } = require("../models");
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
   await User.bulkCreate([
    {
      firstName: "Another",
      lastName: "User",
      email: "anotheruser@user.com",
      username: "another-user",
      hashedPassword: bcrypt.hashSync("password"),
    },
    {
      firstName: "Third",
      lastName: "Seed",
      email: "thirdseed@user.com",
      username: "third-seed",
      hashedPassword: bcrypt.hashSync("password"),
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
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ["another-user", "third-seed"] },
    }, {});
  }
};
