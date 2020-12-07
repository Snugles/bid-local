'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('users', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 42],
      }
    },
    firstName: {
      type: DataTypes.TEXT
    },
    lastName: {
      type: DataTypes.TEXT
    },
    phoneNumber: {
      type: DataTypes.STRING(25),
      validate: {
        isNumeric: true
      }
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.items, { onDelete: 'CASCADE' });
    Users.hasOne(models.addresses, { onDelete: 'CASCADE' });
  };

  Users.findByLogin = async login => { //needed for login
    let user = await Users.findOne({
      where: { email: login },
    });
    return user;
  };

  Users.beforeCreate(user => user.id = uuidv4());

  return Users;
};