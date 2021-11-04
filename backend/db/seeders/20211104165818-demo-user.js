'use strict';

const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.com',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'bobby@bobby.com',
        username: 'bobby',
        hashedPassword: bcrypt.hashSync('bobby123'),
      },
      {
        email: faker.internet.email(),
        username: 'testUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'helloWorld',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'AngelUser',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'ChrisTheBest',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'TaylorsChoice',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'Sophie1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
      return queryInterface.bulkDelete('Users', {
        username: { [Op.in]: ['DemoUser', 'bobby', 'testUser1', 'helloWorld', 'AngelUser', 'ChrisTheBest', 'TaylorsChoice', 'Sophie1'] }
      }, {});
    }
};
