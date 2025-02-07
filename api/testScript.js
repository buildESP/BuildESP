const { sequelize } = require('./config/db');
const { User, Category, Subcategory, Item } = require('./models/associations');

(async () => {
  try {
    // Authentification avec la base de données
    await sequelize.authenticate();
    console.log('Connexion réussie à la base de données.');

    // Étape 1 : Créer 5 utilisateurs
    const users = await Promise.all(
      Array.from({ length: 5 }, (_, i) => 
        User.create({
          firstname: `User${i + 1}`,
          lastname: `LastName${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: `password${i + 1}`,
          address: `123 Rue Exemple ${i + 1}`,
          postcode: `7500${i}`,
          phone: `010203040${i}`,
          rating: (Math.random() * 5).toFixed(2), // Note aléatoire entre 0 et 5
          picture: `https://example.com/images/user${i + 1}.jpg`,
          is_admin: i === 0, // Le premier utilisateur est admin
        })
      )
    );

    console.log('Utilisateurs créés avec succès.');

    // Étape 2 : Créer les catégories et leurs sous-catégories
    const categories = [
      {
        name: 'Outillage',
        subcategories: ['Perceuses', 'Tournevis'],
      },
      {
        name: 'Maison',
        subcategories: ['Décoration', 'Meubles'],
      },
      {
        name: 'Jardin',
        subcategories: ['Plantes', 'Mobilier de jardin'],
      },
      {
        name: 'Livres',
        subcategories: ['Romans', 'BD'],
      },
      {
        name: 'Électronique',
        subcategories: ['Téléphones', 'Ordinateurs'],
      },
    ];

    for (const categoryData of categories) {
      // Créer une catégorie
      const category = await Category.create({ name: categoryData.name });

      console.log(`Catégorie "${category.name}" créée avec succès.`);

      // Créer les sous-catégories associées
      for (const subcategoryName of categoryData.subcategories) {
        const subcategory = await Subcategory.create({
          name: subcategoryName,
          category_id: category.id,
        });

        console.log(`Sous-catégorie "${subcategory.name}" créée pour la catégorie "${category.name}".`);

        // Créer 2 items par sous-catégorie
        for (let i = 0; i < 2; i++) {
          const randomUser = users[Math.floor(Math.random() * users.length)];

          await Item.create({
            name: `${subcategoryName} - Item ${i + 1}`,
            description: `Un exemple d'article ${i + 1} dans la sous-catégorie ${subcategoryName}.`,
            picture: `https://example.com/images/${subcategoryName.toLowerCase()}${i + 1}.jpg`,
            status: i % 3 === 0 ? 'Available' : i % 3 === 1 ? 'Rented' : 'Unavailable',
            user_id: randomUser.id,
            subcategory_id: subcategory.id,
          });

          console.log(`Item "${subcategoryName} - Item ${i + 1}" ajouté à la sous-catégorie "${subcategory.name}".`);
        }
      }
    }

    console.log('Toutes les données ont été insérées avec succès.');
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de l\'insertion des données :', error);
  } finally {
    // Fermer la connexion à la base de données
    await sequelize.close();
  }
})();
