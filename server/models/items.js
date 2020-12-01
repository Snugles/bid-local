'use strict';
module.exports = (sequelize, DataTypes) => {

const Items = sequelize.define('items', {
  name: {
      type: DataTypes.STRING,
    },
  userId: {
    type: DataTypes.INTEGER,
  }
})

Items.associate = (models) => {
    Items.belongsTo(models.users);
  };

return Items;

}