// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Créer une catégorie
router.post('/categories', categoryController.createCategory);

// Récupérer toutes les catégories
router.get('/categories', categoryController.getCategories);

// Récupérer une catégorie par ID
router.get('/categories/:category_id', categoryController.getCategoryById);

// Mettre à jour une catégorie par ID
router.put('/categories/:category_id', categoryController.updateCategory);

// Supprimer une catégorie par ID
router.delete('/categories/:category_id', categoryController.deleteCategory);

module.exports = router;
