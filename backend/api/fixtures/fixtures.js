const readline = require('readline');
const chalk = require('chalk');
const { sequelize } = require('../config/db');
const { User, Category, Subcategory, Item, Exchange } = require('../models/associations');
const userFixtures = require('./userFixtures');
const categoryFixtures = require('./categoryFixtures');
const subcategoryFixtures = require('./subcategoryFixtures');
const itemFixtures = require('./itemFixtures');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const confirmAction = () => {
  return Promise.resolve(true); // Toujours répondre "yes"
};

const applyFixtures = async () => {
  try {
    console.log(chalk.cyan('\n🔗 Connecting to the database...'));

    // Ask for user confirmation
    const confirmed = await confirmAction();
    if (!confirmed) {
      console.log(chalk.red('❌ Action cancelled.'));
      rl.close();
      return;
    }

    console.log(chalk.yellow('\n🚧 Dropping old tables...'));

    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    // Drop foreign key constraint explicitly if necessary
    await sequelize.query('ALTER TABLE Exchanges DROP FOREIGN KEY Exchanges_ibfk_4;');

    // Drop tables in the correct order
    await Exchange.drop();  // Drop Exchange table first, because it references Items
    await Item.drop();      // Then drop the Item table
    await Subcategory.drop();
    await Category.drop();
    await User.drop();

    // Enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log(chalk.green('✅ Old tables dropped successfully.'));

    console.log(chalk.yellow('\n🛠 Recreating tables...'));
    await sequelize.sync({ force: true });

    console.log(chalk.green('✅ Tables recreated successfully.'));

    console.log(chalk.blue('\n📥 Applying fixtures...'));

    await User.bulkCreate(userFixtures);
    console.log(chalk.green('✅ Users inserted successfully.'));

    await Category.bulkCreate(categoryFixtures);
    console.log(chalk.green('✅ Categories inserted successfully.'));

    await Subcategory.bulkCreate(subcategoryFixtures);
    console.log(chalk.green('✅ Subcategories inserted successfully.'));

    await Item.bulkCreate(itemFixtures);
    console.log(chalk.green('✅ Items inserted successfully.'));

    console.log(chalk.bold.green('\n🎉 Fixtures applied successfully!'));
  } catch (error) {
    console.error(chalk.red('\n❌ Error while applying fixtures:'), error);
  } finally {
    rl.close();
  }
};

// Execute the fixture application
applyFixtures();
