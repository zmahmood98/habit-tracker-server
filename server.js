require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors('*'));
app.use(express.json())

const userRoutes = require('./routes/users')
const habitRoutes = require('./routes/habits')

app.use('/', userRoutes)
app.use('/habits', habitRoutes)

module.exports = app
