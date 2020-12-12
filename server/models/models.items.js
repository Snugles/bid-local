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
        notEmpty: {
          args: true,
          msg: 'You must set the item\'s title.',
        }
      }
    },
    minPrice: {
      type: DataTypes.INTEGER,
      default: 0,
      validate: {
        notEmpty: true,
        isDecimal: true
      }
    },
    description: {
      type: DataTypes.TEXT,
    },
    picUrl1: {
      type: DataTypes.TEXT,
    },
    picUrl2: {
      type: DataTypes.TEXT,
    },
    picUrl3: {
      type: DataTypes.TEXT,
    },
    auctionEnd: {
      type: DataTypes.DATE,
    },
    minimumBid: {
      type: DataTypes.INTEGER,
      default: 0,
      validate: {
        isDecimal: true
      }
    },
    bidder: {
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: 4,
      }
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
      validate: {
        isUUID: 4, // Need to put defalut value as Other or ...
      }
    }
  });
  Items.beforeCreate(item => item.id = uuidv4());
  Items.associate = (models) => {
    Items.belongsTo(models.users, {
      foreignKey: 'userId'
    });
    Items.belongsTo(models.categories);
  };
  return Items;
};