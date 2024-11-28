const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route pour créer un nouvel item
router.post('/', itemController.createItem);

// Route pour récupérer tous les items
router.get('/', itemController.getItems);

// Route pour récupérer un item spécifique par ID
router.get('/:id', itemController.getItemById);

// Route pour mettre à jour un item
router.put('/:id', itemController.updateItem);

// Route pour supprimer un item
router.delete('/:id', itemController.deleteItem);

// Route pour récupérer les items d'un utilisateur spécifique (par ID de l'utilisateur)
router.get('/user/:user_id', itemController.getUserItems);

// Route pour récupérer les items disponibles (status = 'Available')
router.get('/available', itemController.getAvailableItems);

module.exports = router;
