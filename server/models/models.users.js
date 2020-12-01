'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('users', {
    id: { primaryKey: true, type: DataTypes.UUID },
    email: { type: DataTypes.TEXT, allowNull: false, unique: true, validate: { isEmail: true, notEmpty: true } },
    password: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true } },
    firstName: { type: DataTypes.TEXT, validate: { isAlpha: true } },
    lastName: { type: DataTypes.TEXT, validate: { isAlpha: true } },
    phoneNumber: { type: DataTypes.INTEGER, validate: { isNumeric: true } },
  })

  Users.associate = (models) => {
    Users.hasMany(models.items, { onDelete: 'CASCADE' });
  };

  Users.beforeCreate(user => user.id = uuidv4());

  return Users;
}