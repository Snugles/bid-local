'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

  const Addresses = sequelize.define('addresses', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    firstLineAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    secondLineAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
    },
    postcode: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: 4,
      }
    }
  });

  Addresses.associate = (models) => {
    Addresses.belongsTo(models.users);
  };

  Addresses.beforeCreate(address => address.id = uuidv4());

  return Addresses;
};