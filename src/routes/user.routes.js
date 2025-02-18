const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// Define routes
router.get('/all-user', Jwt  ,userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;