require('dotenv').config();

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth')
const habitController = require('../controllers/habit')

router.get('/', verifyToken, habitController.getAllHabits)
router.get('/:email',verifyToken, habitController.getHabitsByEmail)
router.get('/habits/:habit_id/:username', habitController.getHabits) // uses .getHabitsPlusStreaks
router.get('/graph-data/:email', habitController.getGraphData)
router.get('/graphdata/:id', habitController.getGraphDatabyHabitId)
router.post('/:username', habitController.create)
router.post('/:username/habits/entries', habitController.updateHabitCounter)
router.delete('/delete/:id', verifyToken, habitController.destroy)

module.exports = router;
