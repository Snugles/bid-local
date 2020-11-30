'use strict';
module.exports = (sequelize, DataTypes) => {

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING
  }
})

User.associate = (models) => {
    User.hasMany(models.item, { onDelete: 'CASCADE' });
  };

return User;
}