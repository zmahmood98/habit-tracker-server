require('dotenv').config();

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth')
const habitController = require('../controllers/habit')

router.get('/', habitController.getAllHabits)
router.get('/:email', habitController.getHabitsByEmail)
router.get('/habits/:habit_id/:username', habitController.getHabits)
router.post('/:username', habitController.create)
router.post('/:username/habits/entries', habitController.updateHabitCounter)
router.delete('/delete/:id', habitController.destroy)

module.exports = router;
