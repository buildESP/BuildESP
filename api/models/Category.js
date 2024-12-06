const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Subcategory = require('./Subcategory'); // Import du modèle Subcategory

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
    underscored: true, // Utilise snake_case pour les noms de colonnes
  }
);



module.exports = Category;
