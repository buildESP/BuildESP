// config/swaggerOptions.js

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Buildinguerie API Documentation',
        version: '1.0.0',
        description: 'API for the Buildinguerie app',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  
  module.exports = swaggerOptions;
  