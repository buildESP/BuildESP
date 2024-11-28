// routes/subcategoryRoutes.js

const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// Créer une sous-catégorie
router.post('/subcategories', subcategoryController.createSubcategory);

// Récupérer toutes les sous-catégories
router.get('/subcategories', subcategoryController.getSubcategories);

// Récupérer une sous-catégorie par ID
router.get('/subcategories/:subcategory_id', subcategoryController.getSubcategoryById);

// Mettre à jour une sous-catégorie par ID
router.put('/subcategories/:subcategory_id', subcategoryController.updateSubcategory);

// Supprimer une sous-catégorie par ID
router.delete('/subcategories/:subcategory_id', subcategoryController.deleteSubcategory);

module.exports = router;
