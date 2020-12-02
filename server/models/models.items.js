'use strict';
const { validate } = require('graphql');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {

  const Items = sequelize.define('items', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true
      }
    },
    minPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: 4,
      }
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: 4,
      }
    }
  });
  Items.beforeCreate(item => item.id = uuidv4());
  Items.associate = (models) => {
    Items.belongsTo(models.users);
    Items.belongsTo(models.categories);
  };

  console.log(uuidv4());
  return Items;

};