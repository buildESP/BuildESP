// models/Category.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'Categories',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Category;
