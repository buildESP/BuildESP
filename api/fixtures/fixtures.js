// fixtures/fixtures.js

const readline = require('readline');
const { sequelize } = require('../config/db');
const { User, Category, Subcategory, Item } = require('../models/associations');
const userFixtures = require('./userFixtures');
const categoryFixtures = require('./categoryFixtures');
const subcategoryFixtures = require('./subcategoryFixtures');
const itemFixtures = require('./itemFixtures');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const confirmAction = () => {
  return new Promise((resolve) => {
    rl.question('Are you sure you want to drop all tables and apply the fixtures? (yes/no) ', (answer) => {
      if (answer.toLowerCase() === 'yes') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

const applyFixtures = async () => {
  try {
    // Connexion à la base de données
    console.log('Successfully connected to the database.');

    // Demander confirmation à l'utilisateur
    const confirmed = await confirmAction();
    if (!confirmed) {
      console.log('Action cancelled.');
      rl.close();
      return;
    }

    // Étape 1 : Supprimer les anciennes tables et recréer les nouvelles
    console.log('Dropping old tables...');
    await sequelize.drop();  // Drop all tables

    // Étape 2 : Recréer toutes les tables selon les modèles
    console.log('Recreating tables...');
    await sequelize.sync({ force: true });  // Recreate tables

    console.log('Applying fixtures...');
    
    // Insertion des utilisateurs
    await User.bulkCreate(userFixtures);
    console.log('Users inserted successfully.');

    // Insertion des catégories
    await Category.bulkCreate(categoryFixtures);
    console.log('Categories inserted successfully.');

    // Insertion des sous-catégories
    await Subcategory.bulkCreate(subcategoryFixtures);
    console.log('Subcategories inserted successfully.');

    // Insertion des articles
    await Item.bulkCreate(itemFixtures);
    console.log('Items inserted successfully.');

    console.log('Fixtures applied successfully.');
  } catch (error) {
    console.error('Error while applying fixtures:', error);
  } finally {
    rl.close();
  }
};

// Exécution de la fonction d'application des fixtures
applyFixtures();
