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
const { createServer } = require('http');
const { Server } = require('socket.io');


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
const imageRoutes = require('./routes/imageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { initSockets } = require('./sockets/chatSocket');


app.use(bodyParser.json());

// Swagger configuration
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes use
app.use(cors({ origin: true }));
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', groupRoutes);
app.use('/api/', imageRoutes);
app.use('/api', chatRoutes);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*", 
    methods: "*",
    allowedHeaders: "*",
  },
});

// Socket auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    console.error("No token provided");
    return next(new Error('Authentication error'));
  }
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Error decoding token:", err);
    next(new Error('Authentication error'));
  };
}
);


initSockets(io);

server.listen(port, () => {
  console.log(chalk.green.bold(`🚀 Good job! Buildinguerie API is running on http://localhost:${port}\n`));
  console.log(chalk.blue(`📚 Docs available at: http://localhost:${port}/doc\n`));
  console.log(chalk.yellow(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`));
});
