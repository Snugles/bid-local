'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {

  const Items = sequelize.define('items', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING
    },
    minPrice: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.UUID,
    }
  })
  Items.beforeCreate(item => item.id = uuidv4());
  Items.associate = (models) => {
    Items.belongsTo(models.users);
  };
  console.log(uuidv4())
  return Items;

}