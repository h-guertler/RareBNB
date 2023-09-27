'use strict';

const { User } = require("../models");
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
   await User.bulkCreate([
    {
      firstName: "Demo",
      lastName: "User",
      email: "user@demouser.com",
      username: "definitely-real",
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
      username: { [Op.in]: ["definitely-real"] },
    }, {});
  }
};
