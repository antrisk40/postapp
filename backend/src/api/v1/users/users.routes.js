const { Router } = require('express');
const { UsersController } = require('./users.controller');
const { authMiddleware } = require('../../../middleware/auth');

const router = Router();
const usersController = new UsersController();

router.get('/profile', authMiddleware, usersController.getProfile);
router.put('/profile', authMiddleware, usersController.updateProfile);
router.get('/:id', usersController.getById);

module.exports = router;


