// app.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const chalk = require('chalk');

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const port = process.env.PORT || 3000;

// import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const groupRoutes = require('./routes/groupRoutes');


app.use(bodyParser.json());

// Swagger configuration
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes use
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', '172.31.41.254'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Autorise les origines dans la liste
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', groupRoutes);

app.listen(port, () => {
  console.log(chalk.green.bold(`🚀 Good job! Buildinguerie API is running on http://localhost:${port}\n`));
  console.log(chalk.blue(`📚 Docs available at: http://localhost:${port}/doc\n`));
  console.log(chalk.yellow(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`));
});