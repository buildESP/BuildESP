// config/sync.js

const { sequelize } = require('./db');
const { User, Category, Subcategory, Item } = require('../models/associations');

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Tables synchronized');
  })
  .catch((err) => {
    console.error('Error during synchronization', err);
  });
