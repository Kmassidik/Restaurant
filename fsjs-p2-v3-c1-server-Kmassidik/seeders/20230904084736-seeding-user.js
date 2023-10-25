"use strict";
const users = require("../json/user.json");
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let user = users.map((e) => ({
      ...e,
      password: bcrypt.hashSync(e.password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // console.log(user);
    await queryInterface.bulkInsert("Users", user);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
