require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Utilisation d'axios pour les requêtes HTTP
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const chalk = require('chalk');

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
  'http://localhost:3000',          // Pour développement local
  'http://localhost:5173',          // Autre port frontend (ex: Vite.js)
  'http://35.180.39.100',           // IP publique de ton Frontend
  'http://172.31.41.254',           // IP privée de ton Frontend (si tests dans le même réseau)
  'https://35.180.39.100',          // Si tu utilises HTTPS pour le frontend
  'https://172.31.41.254'           // Si tu utilises HTTPS dans ton réseau privé
];

app.use(cors({
  origin: (origin, callback) => {
    // Autoriser les origines spécifiées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false); // Retourne une erreur si l'origine n'est pas autorisée
    }
  },
  credentials: true
}));

// Importation des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const groupRoutes = require('./routes/groupRoutes');

// Route pour rediriger la requête d'authentification vers l'API privée
app.post('/api/access-token', async (req, res) => {
  try {
    // Effectuer la requête vers l'API privée située à l'IP interne
    const response = await axios.post('http://172.31.33.98/api/access-token', req.body);

    // Renvoi de la réponse de l'API privée à l'utilisateur final
    res.status(response.status).json(response.data);
  } catch (error) {
    // Si une erreur survient, renvoi du message d'erreur
    console.error('Erreur lors de la requête vers l\'API privée:', error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

// Définition des autres routes API
app.use('/api', authRoutes);       // Authentification
app.use('/api', userRoutes);       // Utilisateur
app.use('/api', categoryRoutes);   // Catégories
app.use('/api', subcategoryRoutes); // Sous-catégories
app.use('/api', itemRoutes);       // Items
app.use('/api', exchangeRoutes);   // Échanges
app.use('/api', groupRoutes);      // Groupes

// Lancement du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(chalk.green.bold(`🚀 API is running on http://0.0.0.0:${port}`));
  console.log(chalk.blue(`📚 Swagger docs: http://0.0.0.0:${port}/doc`));
});
