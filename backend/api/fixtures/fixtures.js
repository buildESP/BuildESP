const chalk = require('chalk');  // Ajout de la ligne pour importer chalk
const { sequelize } = require('../config/db');
const { User, Category, Subcategory, Item, Exchange } = require('../models/associations');
const userFixtures = require('./userFixtures');
const categoryFixtures = require('./categoryFixtures');
const subcategoryFixtures = require('./subcategoryFixtures');
const itemFixtures = require('./itemFixtures');

const applyFixtures = async () => {
  try {
    console.log(chalk.cyan('\n🔗 Connecting to the database...'));

    // Connexion à la base de données
    await sequelize.authenticate();
    console.log(chalk.green('✅ Database connection successful.'));

    // Dropping tables and applying fixtures
    console.log(chalk.yellow('\n🚧 Dropping old tables...'));
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    console.log(chalk.yellow('⚠️ Foreign key checks disabled.'));

    try {
      await Exchange.drop();
      console.log(chalk.green('✅ Exchange table dropped.'));
      await Item.drop();
      console.log(chalk.green('✅ Item table dropped.'));
      await Subcategory.drop();
      console.log(chalk.green('✅ Subcategory table dropped.'));
      await Category.drop();
      console.log(chalk.green('✅ Category table dropped.'));
      await User.drop();
      console.log(chalk.green('✅ User table dropped.'));
    } catch (error) {
      console.error(chalk.red('❌ Error while dropping tables:', error));
    }

    // Créer les tables et insérer les données
    console.log(chalk.yellow('\n🛠 Recreating tables...'));
    await sequelize.sync({ force: true });
    console.log(chalk.green('✅ Tables recreated successfully.'));

    console.log(chalk.blue('\n📥 Applying fixtures...'));

    try {
      await User.bulkCreate(userFixtures);
      console.log(chalk.green('✅ Users inserted successfully.'));
      await Category.bulkCreate(categoryFixtures);
      console.log(chalk.green('✅ Categories inserted successfully.'));
      await Subcategory.bulkCreate(subcategoryFixtures);
      console.log(chalk.green('✅ Subcategories inserted successfully.'));
      await Item.bulkCreate(itemFixtures);
      console.log(chalk.green('✅ Items inserted successfully.'));
    } catch (error) {
      console.error(chalk.red('❌ Error while applying fixtures:', error));
    }

    console.log(chalk.bold.green('\n🎉 Fixtures applied successfully!'));
  } catch (error) {
    console.error(chalk.red('\n❌ Error while applying fixtures:', error));
  }
};

// Execute the fixture application
applyFixtures();
