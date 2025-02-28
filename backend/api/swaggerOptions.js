// config/swaggerOptions.js

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NeighBorrow API Documentation',
      version: '1.0.0',
      description: 'API for the NeighBorrow app',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;