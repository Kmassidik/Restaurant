"use strict";
const cuisines = require("../json/cusine.json");
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
    let cuisin = cuisines.map((e) => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // console.log(cuisin);
    await queryInterface.bulkInsert("Cuisines", cuisin);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Cuisines", null, {});
  },
};
