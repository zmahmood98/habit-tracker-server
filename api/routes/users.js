const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth')

const userController = require('../controllers/user')

router.get('/', userController.index)
router.get('/:name', verifyToken, userController.findByName)

module.exports = router;
