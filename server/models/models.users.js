'use strict';
module.exports = (sequelize, DataTypes) => {

const Users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING
  }
})

Users.associate = (models) => {
    Users.hasMany(models.items, { onDelete: 'CASCADE' });
  };

return Users;
}