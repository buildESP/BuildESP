// models/associations.js

const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Item = require('./Item');
const User = require('./User');

Category.hasMany(Subcategory, { foreignKey: 'category_id', as: 'subcategories' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Subcategory.hasMany(Item, { foreignKey: 'subcategory_id', as: 'items' });
Item.belongsTo(Subcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });

User.hasMany(Item, { foreignKey: 'user_id', as: 'items' });
Item.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = { Category, Subcategory, Item, User };
