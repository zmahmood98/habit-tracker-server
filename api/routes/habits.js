require('dotenv').config();

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth')
const habitController = require('../controllers/habit')

router.get('/', verifyToken, habitController.getAllHabits)
router.get('/:name', verifyToken, habitController.getHabitsByName)
router.get('/habits/:habit_id/:username', habitController.getHabits)
router.post('/:username', habitController.create)
router.post('/:username/habits/entries', habitController.updateHabitCounter)
router.delete('/delete/:id', verifyToken, habitController.destroy)

module.exports = router;
