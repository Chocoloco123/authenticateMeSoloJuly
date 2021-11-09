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
      return queryInterface.bulkInsert('Comments', [
      {
        userId: 2,
        imageId: 1,
        comment: 'So beautiful!',
        createdAt: '2018-12-02', updatedAt: '2019-01-22'
      },
      {
        userId: 1,
        imageId: 5,
        comment: 'I love air balloons!',
        createdAt: '2018-12-02', updatedAt: '2019-01-22'
      },
      {
        userId: 6,
        imageId: 1,
        comment: 'I love the colors!',
        createdAt: '2018-12-02', updatedAt: '2019-01-22'
      },
      {
        userId: 5,
        imageId: 1,
        comment: 'Where was this taken, it\'s an amazing photo!',
        createdAt: '2018-12-02', updatedAt: '2019-01-22'
      },
      {
        userId: 7,
        imageId: 2,
        comment: 'Love the colors, very nice!',
        createdAt: '2018-12-02', updatedAt: '2019-01-22'
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
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
