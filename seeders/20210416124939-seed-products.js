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
   let data = [
    {
      name: "gergaji",
      imageUrl: "",
      price: 11,
      stock: 11
    },
    {
      name: "SEPATU",
      imageUrl: "",
      price: 11,
      stock: 11
    },
    {
      name: "HEADSET",
      imageUrl: "",
      price: 11,
      stock: 11
    },
    {
      name: "PIPA",
      imageUrl: "",
      price: 11,
      stock: 11
    },
   ]
   data.forEach(e => {
     e.createdAt = new Date()
     e.updatedAt = new Date()
   })
   return queryInterface.bulkInsert('Products', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products', null, {})
  }
};
