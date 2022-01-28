'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsTo(models.User, {
      foreignKey: 'userId' 
    }),
    Album.hasMany(models.Image, { foreignKey: 'albumId', onDelete: 'CASCADE', hooks: true })
  };
  return Album;
};