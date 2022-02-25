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

async function findByName (req, res){
try{ 
        const findName = await User.findUsername(req.params.username); 
        if (!findName.length) {throw new Error('User not found')}
        res.status(200).json(findName);
} catch(err) {
        res.status(403).json(err.message);
        }
}

module.exports = { index, findByName }
