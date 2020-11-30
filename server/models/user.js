'use strict';
module.exports = (sequelize, DataTypes) => {

const User = sequelize.define('user', {
  id: 
    {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  username: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.INTEGER,
  address: DataTypes.STRING
})

User.associate = (models) => {
    User.hasMany(models.item);
  };

return User;

}