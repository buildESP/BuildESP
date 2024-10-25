const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // Import des routes pour les utilisateurs

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());  // Pour parser le JSON dans les requêtes POST
app.use('/api', userRoutes); // Utilise les routes des utilisateurs sous /api

app.listen(port, () => {
  console.log(`Good job! Buildinguerie API is running on http://localhost:${port}`);
});
