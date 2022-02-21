require('dotenv').config();

const User = require('../model/User');

async function index (req, res) {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch(err) {
        res.status(500).send({err})
    }
}

async function findByName (req, res) {
    try {
        const findName = await User.findUsername(req.params.username)
        if (!findName.rows.length) {
            res.status(404).json({msg: "User not found"})
        } else {
            res.status(200).json({msg: "User found"})
        }
    } catch(err) {
        res.status(500).send({err})
    }
}


module.exports = { index, findByName }
