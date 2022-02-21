require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors('*'));
app.use(express.json())

const authRoutes = require('./routes/auths');
const userRoutes = require('./routes/users')
const habitRoutes = require('./routes/habits')

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/habits', habitRoutes)

console.log('Hello')
// app.get('/', (req, res) => res.send('Welcome to ReinHabit'))

module.exports = app
