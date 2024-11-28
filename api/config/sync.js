// config/sync.js

const { sequelize } = require('./db');
const User = require('../models/User');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Item = require('../models/Item');

User.hasMany(Item, { foreignKey: 'user_id', as: 'items' });

Category.hasMany(Subcategory, { foreignKey: 'category_id', as: 'subcategories' });

Subcategory.belongsTo(Category, { foreignKey: 'category_id', as: 'category', constraints: false });
Subcategory.hasMany(Item, { foreignKey: 'subcategory_id', as: 'items' });

Item.belongsTo(User, { foreignKey: 'user_id', as: 'user', constraints: false});
Item.belongsTo(Subcategory, { foreignKey: 'subcategory_id', as: 'subcategory', constraints: false});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tables synchronized');
  })
  .catch((err) => {
    console.error('Error during synchronization', err);
  });
