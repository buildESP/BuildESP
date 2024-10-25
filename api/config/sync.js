const { sequelize } = require('./db');
const User = require('../models/User');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('User table is synchronized');
  })
  .catch((err) => {
    console.error('Error during synchronization', err);
  });