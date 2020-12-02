'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = (sequlize, DataTypes) => {
  const Categories = sequlize.define('categories', {
    id: { primaryKey: true, type: DataTypes.UUID},
    name: { type: DataTypes.STRING, unique: true ,validate: {notEmpty:true, isAlpha: true } }
  });

  Categories.associate = (models) => {
    Categories.hasMany(models.items, { onDelete: 'CASCADE' });
  };

  Categories.beforeCreate(category => category.id = uuidv4());

  return Categories;
};