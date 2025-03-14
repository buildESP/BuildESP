// config/sync.js

const chalk = require('chalk');
const { sequelize } = require('./db');
require('../models/associations');

console.log(chalk.blue.bold('🔄 Synchronizing database tables...'));

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(chalk.green.bold('✅ Tables synchronized successfully!'));
  })
  .catch((err) => {
    console.error(chalk.red.bold('❌ Error during synchronization:'), chalk.red(err));
    console.error(chalk.blue.bold('🧐 Please check that database is running !'));
  });