require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const chalk = require('chalk');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Vérif clé secrète
if (!process.env.SECRET_KEY) {
  console.error(chalk.red.bold('⛔ SECRET_KEY non défini dans .env !'));
  process.exit(1);
}

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`🌍 Requête : ${req.method} ${req.url} - Origine : ${req.headers.origin}`);
  next();
});

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
  })
);

app.options('*', cors());

// Swagger
const swaggerOptions = require('./swaggerOptions');
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const groupRoutes = require('./routes/groupRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.post('/api/access-token', async (req, res) => {
  try {
    const response = await axios.post('http://172.31.33.98:3000/api/access-token', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'Erreur lors de la récupération du token',
      error: error.message,
    });
  }
});

// API
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', groupRoutes);
app.use('/api', imageRoutes);

// Gestion globale erreurs
app.use((err, req, res, next) => {
  console.error('💥 Erreur non gérée :', err.message);
  res.status(err.status || 500).json({ message: err.message });
});

// Démarrage serveur
app.listen(port, '0.0.0.0', () => {
  console.log(chalk.green.bold(`🚀 Serveur lancé sur le port ${port}`));
  console.log(chalk.blue(`📚 Docs Swagger : http://localhost:${port}/doc`));
});
