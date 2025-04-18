require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');
const cors = require('cors');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const { createServer } = require('http');
const { Server } = require('socket.io');

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const imageRoutes = require('./routes/imageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { initSockets } = require('./sockets/chatSocket');

// ✅ Liste des domaines autorisés
const allowedOrigins = [
  'http://15.237.77.97',
  'http://neighborrow.hephel.fr',
  'https://neighborrow.hephel.fr',
  'http://localhost:3000',
  'http://localhost:5173',
];

// ✅ CORS pour Express
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log(`CORS: Allowing origin ${origin}`);
      callback(null, true);
    } else {
      console.log(`CORS: Blocking origin ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(bodyParser.json());

// Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', groupRoutes);
app.use('/api/', imageRoutes);
app.use('/api', chatRoutes);

// ✅ Serveur HTTP + Socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Middleware d'authentification Socket.io
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    console.error("No token provided");
    return next(new Error('Authentication error'));
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Error decoding token:", err);
    next(new Error('Authentication error'));
  }
});

// Init des sockets
initSockets(io);

// Lancement du serveur
server.listen(port, () => {
  console.log(chalk.green.bold(`🚀 API running on http://localhost:${port}`));
  console.log(chalk.blue(`📚 Swagger docs at: http://localhost:${port}/doc`));
  console.log(chalk.yellow(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`));
  console.log(`Server is running on port ${port}`);
});
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
