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
          url: 'http://172.31.33.98:3000',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  
  module.exports = swaggerOptions;
  