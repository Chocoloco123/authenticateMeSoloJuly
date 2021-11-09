'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Albums', [
      {
      userId: 1,
      title: "Mountain Scenes",
      createdAt: '2018-12-01', updatedAt: '2019-01-22'
    },
    {
      userId: 1,
      title: "Beauty",
      createdAt: '2018-12-01', updatedAt: '2019-01-22'
    },
    {
      userId: 2,
      title: "Sky",
      createdAt: '2018-12-01', updatedAt: '2019-01-22'
    },
    {
      userId: 3,
      title: "Grassy",
      createdAt: '2018-12-01', updatedAt: '2019-01-22'
    },
    {
      userId: 4,
      title: "Mountains",
      createdAt: '2018-12-01', updatedAt: '2019-01-22'
    },
    {
      userId: 5,
      title: "Beautiful Skies",
      createdAt: '2018-12-01', updatedAt: '2019-01-22'
    },
    {
      userId: 5,
      title: "New Photos",
      createdAt: '2018-12-01', updatedAt: '2019-01-22'
    },
    {
      userId: 6,
      title: "Waterways",
      createdAt: '2018-12-01', updatedAt: '2019-01-22'
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    // return queryInterface.bulkDelete('Albums', null, {});
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
