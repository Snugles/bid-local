'use strict';
module.exports = (sequelize, DataTypes) => {

const Item = sequelize.define('item', {
  id: 
    {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4 
    },
  item_name: DataTypes.STRING,
  desc: DataTypes.STRING,
  price: DataTypes.INTEGER,
})

Item.associate = (models) => {
    Item.belongsTo(models.user);
  };

return Item;

}