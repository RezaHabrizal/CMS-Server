'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let admin = [{
     name: 'reza',
     email: 'rz@mail.com',
     password: '123456',
     role: 'adminqweqwe',
     createdAt: new Date(),
     updatedAt: new Date()
   }]
   return queryInterface.bulkInsert('Users', admin, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
