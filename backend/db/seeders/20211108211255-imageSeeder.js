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
      content: 'Took this photo last spring. I wanted to capture the beauty of this colorful scene with the reflection of the lake.',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },
    {
      userId: 1,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636392983/pexels-jaime-reimer-2662116_gwsjbq.jpg',
      imageTitle: 'Mountain Reflection',
      content: 'I love taking photos of mountains!',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },
    {
      userId: 1,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636392992/pexels-roberto-nickson-2559941_aehqqb.jpg',
      imageTitle: 'Mountain at Dusk',
      content: 'It was getting late on our hike when I captured this. Definitely worth the hike.',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },{
      userId: 1,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636392866/pexels-pixabay-206359_agy77s.jpg',
      imageTitle: 'Purple Sky',
      content: 'Took this photo last spring. I wanted to capture the beauty of this colorful scene with the reflection of the lake.',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },
    {
      userId: 2,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636393001/pexels-francesco-ungaro-2325446_k0tdax.jpg',
      imageTitle: 'Air Balloon Bliss',
      content: 'I loved this experience. Got to fly high in an air balloon for the first time and captured this image.',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },
    {
      userId: 2,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636393123/pexels-pixabay-36717_hyx0pa.jpg',
      imageTitle: 'Tree of Life',
      content: 'Nature at its best.',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },
    {
      userId: 3,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636393128/pexels-pixabay-207247_rxfheg.jpg',
      imageTitle: 'Grassy Sky',
      content: 'Grassy sunset.',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },
    {
      userId: 4,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636393133/pexels-senuscape-1658967_porrzo.jpg',
      imageTitle: 'Clouded Mountain Trek',
      content: 'This train\'s ascending into the clouds.',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },
    {
      userId: 5,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636393142/pexels-james-wheeler-1486974_gl2km7.jpg',
      imageTitle: 'Pink Skies',
      content: 'I loved this reflection and had to share!',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    },
    {
      userId: 6,
      imageUrl: 'https://res.cloudinary.com/dsz4sha80/image/upload/v1636393267/pexels-rachel-xiao-772429_doz6ya.jpg',
      imageTitle: 'Little Canal',
      content: 'Peace',
      createdAt: '2018-11-30', updatedAt: '2019-01-22'
    }

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', null, {});
  }
};
