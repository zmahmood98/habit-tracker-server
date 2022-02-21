const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth')

const userController = require('../controllers/user')

router.get('/', userController.index)
router.get('/....', verifyToken, userController.findByname)
router.post('/register', userController.register)
router.post('/login', userController.login)
