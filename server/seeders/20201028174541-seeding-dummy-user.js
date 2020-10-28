'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { hashPassword } = require("../helpers/bcrypt")

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hash = hashPassword("12345678")
    const data = [
      {
        name: "tes akun",
        email: "tes@email.com",
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert("Users", data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {})
  }
};
