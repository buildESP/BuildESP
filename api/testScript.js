const { sequelize } = require('./config/db');
const User = require('./models/User');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Item = require('./models/Item');

(async () => {
  try {
    // Authentification avec la base de données
    await sequelize.authenticate();
    console.log('Connexion réussie à la base de données.');

    // Étape 1 : Insérer un utilisateur avec tous les champs requis
    const user = await User.create({
      firstname: 'John5',
      lastname: 'Doe5',
      email: 'test5@example.com',
      password: 'securepassword2', // Assurez-vous que le mot de passe est sécurisé
    });

    // Étape 2 : Insérer une catégorie
    const category = await Category.create({
      name: 'Électronique',
    });

    // Étape 3 : Insérer une sous-catégorie liée à la catégorie
    const subcategory = await Subcategory.create({
      name: 'Téléphones',
      category_id: category.id, // Associe cette sous-catégorie à la catégorie créée
    });

    // Étape 4 : Insérer un article lié à l'utilisateur et à la sous-catégorie
    await Item.create({
      name: 'iPhone',
      description: 'Un smartphone moderne avec des fonctionnalités avancées.',
      user_id: user.id, // Associe cet article à l'utilisateur créé
      subcategory_id: subcategory.id, // Associe cet article à la sous-catégorie créée
    });

    console.log('Données insérées avec succès.');

    // Étape 5 : Récupérer les données avec les relations
    const fetchedCategory = await Category.findOne({
      where: { name: 'Électronique' }, // Recherche la catégorie par son nom
      include: [
        {
          model: Subcategory,
          as: 'subcategories', // Alias défini dans les relations
          include: [
            {
              model: Item,
              as: 'items', // Alias défini dans les relations
            },
          ],
        },
      ],
    });

    // Affichage des résultats au format JSON pour une meilleure lisibilité
    console.log('Catégorie récupérée :', JSON.stringify(fetchedCategory, null, 2));
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors du test :', error);
  } finally {
    // Fermer la connexion à la base de données
    await sequelize.close();
  }
})();
