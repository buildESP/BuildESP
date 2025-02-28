// models/Exchange.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Exchange = sequelize.define(
  'Exchange',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lender_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    borrow_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending',
    },
  },
  {
    tableName: 'Exchanges',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

module.exports = Exchange;
