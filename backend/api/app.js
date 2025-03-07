require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Utilisation d'axios pour les requêtes HTTP
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const chalk = require('chalk');
const { Sequelize } = require('sequelize');  // Importation de Sequelize

// Création de l'application express
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json());

// Configuration Swagger
const swaggerOptions = require('./swaggerOptions');
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuration CORS pour autoriser certaines origines (frontends)
const allowedOrigins = [
  'http://172.31.41.254',          // IP privée de votre Frontend
  'http://35.180.198.122',          // IP publique de votre Frontend
  'https://35.180.198.122',         // Si votre frontend utilise HTTPS
  'http://localhost:3000',        // Pour développement local
  'http://localhost:5173',        // Autre port frontend (ex: Vite.js)
  'https://172.31.41.254',        // Si vous utilisez HTTPS dans votre réseau privé
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: "GET,POST,OPTIONS",  // Autoriser explicitement les méthodes
  allowedHeaders: "Content-Type,Authorization"  // Autoriser explicitement les en-têtes
}));

// Gérer les requêtes OPTIONS
app.options('*', cors()); // Permet les requêtes OPTIONS sur toutes les routes

// Importation des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const imageRoutes = require('./routes/imageRoutes');
const groupRoutes = require('./routes/groupRoutes');

// Connexion à la base de données via Sequelize
const sequelize = new Sequelize('neighborrow_db', 'user', 'userpassword', {
  host: 'db', // Nom du service MySQL dans le docker-compose
  dialect: 'mysql',
  dialectOptions: {
    ssl: false, // Désactiver SSL pour éviter les erreurs TLS/SSL
  },
});

// Test de la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log(chalk.green('✅ Connexion à la base de données réussie !'));
  })
  .catch((error) => {
    console.error(chalk.red('❌ Impossible de se connecter à la base de données :', error.message));
  });

// Route pour rediriger la requête d'authentification vers l'API privée
app.post('/api/access-token', async (req, res) => {
  try {
    console.log("Requête reçue avec les données :", req.body);

    // Effectuer la requête vers l'API privée située à l'IP interne
    const response = await axios.post('http://172.31.33.98:3000/api/access-token', req.body);

    // Log de la réponse de l'API privée
    console.log("Réponse de l'API privée :", response.data);

    // Renvoi de la réponse de l'API privée à l'utilisateur final
    res.status(response.status).json(response.data);
  } catch (error) {
    // Si une erreur survient, renvoyer le message d'erreur
    console.error('Erreur lors de la requête vers l\'API privée:', error.message);
    console.error('Détails de l\'erreur :', error.response ? error.response.data : error);

    // Si une erreur survient, renvoyer le message d'erreur
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

// Définition des autres routes API
app.use(cors({ origin: true }));
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', groupRoutes);
app.use('/api/', imageRoutes);

// Lancement du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(chalk.green.bold(`🚀 API is running on http://0.0.0.0:${port}`));
  console.log(chalk.blue(`📚 Swagger docs: http://0.0.0.0:${port}/doc`));
});
