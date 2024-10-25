const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id_utilisateur', userController.getUserById);
router.put('/users/:id_utilisateur', userController.updateUser);
router.delete('/users/:id_utilisateur', userController.deleteUser);

module.exports = router;
