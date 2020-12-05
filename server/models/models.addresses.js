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
      notEmpty: true,
    },
    secondLineAddress: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    postcode: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    country: {
      type: DataTypes.STRING,
      notEmpty: true
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