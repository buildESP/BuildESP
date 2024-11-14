const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Swagger configuration
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Good job! Buildinguerie API is running on http://localhost:${port}`);
  console.log(`Docs available at http://localhost:${port}/doc`);
});
