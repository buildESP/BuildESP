const chalk = require('chalk');
const { sequelize } = require('../config/db');
const { User, Category, Subcategory, Item, Exchange } = require('../models/associations');
const userFixtures = require('./userFixtures');
const categoryFixtures = require('./categoryFixtures');
const subcategoryFixtures = require('./subcategoryFixtures');
const itemFixtures = require('./itemFixtures');

// Supprimer readline et répondre toujours "yes"
const confirmAction = () => {
  return Promise.resolve(true); // Répondre automatiquement "yes"
};

const applyFixtures = async () => {
  try {
    console.log(chalk.cyan('\n🔗 Connecting to the database...'));

    // Pas de confirmation utilisateur, on applique directement
    const confirmed = await confirmAction();
    if (!confirmed) {
      console.log(chalk.red('❌ Action cancelled.'));
      return;
    }

    console.log(chalk.yellow('\n🚧 Dropping old tables...'));

    // Désactiver les vérifications des clés étrangères
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    // Supprimer les contraintes de clés étrangères si nécessaire
    await sequelize.query('ALTER TABLE Exchanges DROP FOREIGN KEY Exchanges_ibfk_4;');

    // Supprimer les tables dans le bon ordre
    await Exchange.drop();  // Supprimer la table Exchange en premier, car elle référence Items
    await Item.drop();      // Ensuite, supprimer la table Item
    await Subcategory.drop();
    await Category.drop();
    await User.drop();

    // Réactiver les vérifications des clés étrangères
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
  }
};

// Exécuter l'application des fixtures
applyFixtures();
