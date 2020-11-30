'use strict';
module.exports = (sequelize, DataTypes) => {

const Item = sequelize.define('item', {
  name: {
      type: DataTypes.STRING,
    }
})

Item.associate = (models) => {
    Item.belongsTo(models.user);
  };

return Item;

}