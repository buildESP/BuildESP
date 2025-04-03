require('dotenv').config();
const express = require('express');
const axios = require('axios');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const chalk = require('chalk');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const { upload } = require('./s3Service');

const app = express();
const port = process.env.PORT || 3000;

// Vérification des variables d'environnement essentielles
if (!process.env.SECRET_KEY) {
  console.error(chalk.red.bold('⛔ SECRET_KEY non défini dans .env !'));
  process.exit(1);
}

// 🛡 Sécurité avec Helmet
app.use(helmet());

// 📝 Logger des requêtes avec Morgan
app.use(morgan('dev'));

// 📦 Middleware pour parser les requêtes JSON (body-parser n'est plus nécessaire)
app.use(express.json());

// 🔍 Middleware pour logger les requêtes et leur origine
app.use((req, res, next) => {
  console.log(`🌍 Requête : ${req.method} ${req.url} - Origine : ${req.headers.origin}`);
  next();
});

// 🎛 Configuration CORS
const allowedOrigins = [
  'http://172.31.41.254',
  'http://13.37.220.85',
  'https://13.37.220.85',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://172.31.41.254',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  })
);

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
const groupRoutes = require('./routes/groupRoutes');
const imageRoutes = require('./routes/imageRoutes');

// 🌍 Proxy vers l'API privée pour l'authentification
app.post('/api/access-token', async (req, res) => {
  try {
    console.log('🔑 Requête reçue avec les données :', req.body);

    const response = await axios.post('http://172.31.33.98:3000/api/access-token', req.body);

    console.log('✅ Réponse API privée :', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('❌ Erreur API privée:', error.message);
    res.status(error.response?.status || 500).json({
      message: 'Erreur lors de la récupération du token',
      error: error.message,
    });
  }
});

// 📌 Définition des routes API
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', groupRoutes);
app.use('/api', imageRoutes);

// Route pour l'upload d'images
app.post('/api/images/upload', upload.single('image'), async (req, res) => {
    try {
        const entityType = req.body.entityType;
        const entityId = req.body.entityId;
        const file = req.file;

        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`;
        res.send({ message: 'Image uploadée avec succès', imageUrl });
    } catch (error) {
        console.error("❌ Erreur lors de l'upload sur S3:", error);
        res.status(500).send({ message: 'Échec de l’upload de l’image sur S3' });
    }
});

// 🎯 Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('💥 Erreur non gérée :', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur interne',
  });
});

// 🚀 Lancement du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(chalk.green.bold(`🚀 Serveur lancé sur le port ${port}`));
  console.log(chalk.blue(`📚 Docs Swagger : http://0.0.0.0:${port}/doc`));
});
