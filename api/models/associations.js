// models/associations.js

const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Item = require('./Item');
const User = require('./User');
const Group = require('./Group');

// Associations for Category and Subcategory
Category.hasMany(Subcategory, { foreignKey: 'category_id', as: 'subcategories' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Associations for Subcategory and Item
Subcategory.hasMany(Item, { foreignKey: 'subcategory_id', as: 'items' });
Item.belongsTo(Subcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });

// Associations for User and Item (one-to-many)
User.hasMany(Item, { foreignKey: 'user_id', as: 'items' });
Item.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Associations for Group and User (one-to-many, admin relationship)
Group.belongsTo(User, { foreignKey: 'group_admin', as: 'admin' });

// Many-to-many relationship between User and Group via the UserGroups table
User.belongsToMany(Group, { through: 'UserGroups', foreignKey: 'user_id', otherKey: 'group_id', as: 'groups' });
Group.belongsToMany(User, { through: 'UserGroups', foreignKey: 'group_id', otherKey: 'user_id', as: 'users' });

// Exporting associations
module.exports = { Category, Subcategory, Item, User, Group };
