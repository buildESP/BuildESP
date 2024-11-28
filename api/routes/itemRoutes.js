// routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

// Route pour créer un item
router.post('/items', ItemController.createItem);

// Route pour obtenir tous les items
router.get('/items', ItemController.getItems);

// Route pour obtenir un item par ID
router.get('/items/:id', ItemController.getItemById);

// Route pour mettre à jour un item
router.put('/items/:id', ItemController.updateItem);

// Route pour supprimer un item
router.delete('/items/:id', ItemController.deleteItem);

module.exports = router;
