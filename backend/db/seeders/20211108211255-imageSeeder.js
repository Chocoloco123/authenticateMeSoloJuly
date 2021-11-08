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
    return queryInterface.bulkInsert('Images', [
      {
      userId: 1,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636392866/pexels-pixabay-206359_agy77s.jpg',
      imageTitle: 'Purple Sky',
      content: 'Took this photo last spring. I wanted to capture the beauty of this colorful scene with the reflection of the lake.'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      
    }, {});
  }
};
