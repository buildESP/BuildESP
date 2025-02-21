require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger configuration
const swaggerOptions = require('./swaggerOptions');
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',          // Pour développement local
  'http://localhost:5173',          // Si tu utilises un autre port pour le frontend (ex: vite.js)
  'http://35.180.39.100',           // IP publique de ton Frontend
  'http://172.31.41.254',           // IP privée de ton Frontend (pour tests dans le même réseau)
  'https://35.180.39.100',          // Optionnel si tu utilises HTTPS pour le frontend
  'https://172.31.41.254'           // Optionnel pour HTTPS dans ton réseau privé
];

app.use(cors({
  origin: (origin, callback) => {
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

// Définition des routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', groupRoutes);

// Lancement du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(chalk.green.bold(`🚀 API is running on http://0.0.0.0:${port}`));
  console.log(chalk.blue(`📚 Swagger docs: http://0.0.0.0:${port}/doc`));
});
