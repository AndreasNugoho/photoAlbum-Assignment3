'use strict';
const data = [
  {
    title: "Photo 4",
    caption: "Caption photo 4",
    image_url: "https://picsum.photos/id/4/200/300",
    UserId: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

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
    await queryInterface.bulkInsert("Photos", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Photos",null, {})
  }
};
