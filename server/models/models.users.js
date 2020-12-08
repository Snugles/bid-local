'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

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

  Users.beforeCreate(async user => {
    user.id = uuidv4();
    user.password = await user.generatePasswordHash();
  });

  Users.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  Users.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return Users;
};