const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Subcategory = sequelize.define(
  'Subcategory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'Subcategories',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Subcategory;
