'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    albumId: {
      type: DataTypes.INTEGER,
      references: { model: 'Albums' },
      allowNull: true,
      // onDelete: "SET NULL",
      // hooks: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageTitle: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT
    },
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User, { foreignKey: 'userId' }),
    // Image.belongsTo(models.Album, { foreignKey: 'albumId', onDelete: "SET NULL", hooks: true }),
    Image.belongsTo(models.Album, { foreignKey: 'albumId' }),
    // Image.belongsTo(models.Album, { foreignKey: { name: 'albumId', allowNull: true}, onDelete: "SET NULL", hooks: true }),
    Image.hasMany(models.Comment, { foreignKey: 'imageId', onDelete: 'CASCADE', hooks: true  })
  };
  return Image;
};