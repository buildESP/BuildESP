// models/Item.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Subcategory = require('./Subcategory');

const Item = sequelize.define(
  'Item',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subcategory,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Available', 'Rented', 'Unavailable'),
      allowNull: false,
      defaultValue: 'Available',
    },
  },
  {
    tableName: 'Items',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Item;
