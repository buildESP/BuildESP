const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // Assurez-vous que le modèle User est importé
// const Subcategory = require('./subcategory'); // Assurez-vous que le modèle Subcategory est importé

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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // subcategory_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Subcategory,
    //     key: 'id',
    //   },
    // },
    daily_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    max_rental_duration: {
      type: DataTypes.INTEGER,
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

Item.belongsTo(User, { foreignKey: 'user_id' });
Item.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });

module.exports = Item;
