'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'Users' }
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Images' }
    },
    comment: {
      type: DataTypes.TEXT
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userId' }),
    Comment.belongsTo(models.Image, { foreignKey: 'imageId'})
  };
  return Comment;
};