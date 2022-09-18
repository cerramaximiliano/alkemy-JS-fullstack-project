const path = require('path');

const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logout);

module.exports = router;