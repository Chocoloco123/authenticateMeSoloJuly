'use strict';
​
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeConstraint('Images', 'Images_albumId_fkey', { transaction });
      await queryInterface.changeColumn('Images', 'albumId', {
        type: Sequelize.INTEGER,
        references: { model: 'Albums' },
        allowNull: true,
        onDelete: 'set null',
      }, { transaction });
    });
  },
​
  async down (queryInterface, Sequelize) {
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeConstraint('Images', 'Images_albumId_fkey', { transaction });
      await queryInterface.changeColumn('Images', 'albumId', {
        type: Sequelize.INTEGER,
        references: { model: 'Albums' },
      }, { transaction });
    });
  }
};