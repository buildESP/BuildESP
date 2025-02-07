// models/associations.js

const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Item = require('./Item');
const User = require('./User');
const Group = require('./Group');

// Associations between Category and Subcategory
Category.hasMany(Subcategory, { foreignKey: 'category_id', as: 'subcategories' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Associations between Subcategory and Item
Subcategory.hasMany(Item, { foreignKey: 'subcategory_id', as: 'items' });
Item.belongsTo(Subcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });

// Associations between User and Item
User.hasMany(Item, { foreignKey: 'user_id', as: 'items' });
Item.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Associations between Item and Exchange
Item.hasMany(Exchange, { foreignKey: 'item_id', as: 'exchanges' });
Exchange.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

// Associations between User and Exchange (for the lender)
User.hasMany(Exchange, { foreignKey: 'lender_user_id', as: 'lender_exchanges' });
Exchange.belongsTo(User, { foreignKey: 'lender_user_id', as: 'lender_user' });

// Associations between User and Exchange (for the borrower)
User.hasMany(Exchange, { foreignKey: 'borrow_user_id', as: 'borrow_exchanges' });
Exchange.belongsTo(User, { foreignKey: 'borrow_user_id', as: 'borrow_user' });

module.exports = { Category, Subcategory, Item, User, Exchange };


module.exports = { Category, Subcategory, Item, User, Group };
