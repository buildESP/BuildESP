require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json());

// 🔍 Middleware pour logger les requêtes et leur origine
app.use((req, res, next) => {
  console.log(`🌍 Requête reçue : ${req.method} ${req.url} - Origine : ${req.headers.origin}`);
  next();
});

// 🎛 Configuration CORS
const allowedOrigins = [
  'http://172.31.41.254',          
  'http://15.237.77.97',           
  'https://15.237.77.97',          
  'http://localhost:3000',        
  'http://localhost:5173',        
  'https://172.31.41.254',        
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS ERROR: Origine non autorisée - ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: "GET,POST,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

// Autoriser les requêtes OPTIONS globalement
app.options('*', cors());

// 📖 Configuration Swagger
const swaggerOptions = require('./swaggerOptions');
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🚀 Importation des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const imageRoutes = require('./routes/imageRoutes');
const groupRoutes = require('./routes/groupRoutes');

// 🌍 Redirection de la requête d'authentification vers l'API privée
app.post('/api/access-token', async (req, res) => {
  try {
    console.log("🔑 Requête reçue avec les données :", req.body);
    
    const response = await axios.post('http://172.31.33.98:3000/api/access-token', req.body);

    console.log("✅ Réponse de l'API privée :", response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('❌ Erreur API privée:', error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

// 📌 Définition des routes API
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', groupRoutes);
app.use('/api', imageRoutes);

// 🎯 Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("💥 Erreur non gérée :", err.message);
  res.status(500).json({ message: "Erreur serveur interne" });
});

// 🚀 Lancement du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(chalk.green.bold(`🚀 API en ligne : http://0.0.0.0:${port}`));
  console.log(chalk.blue(`📚 Docs Swagger : http://0.0.0.0:${port}/doc`));
});
