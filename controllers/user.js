require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require('../models/user');

async function index (req, res) {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch(err) {
        res.status(500).send({err})
    }
}

async function findByname (req, res) {
    try {
        const findName = await User.
        res.status(200).json(users)
    } catch(err) {
        res.status(500).send({err})
    }
}

async function register (req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        await User.create({...req.body, password: hashed})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
}

async function login (req, res) {
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){ throw new Error('No user with this email') }
        const authed = bcrypt.compare(req.body.password, user.passwordDigest)
        if (!!authed){
            const payload = { username: user.username, email: user.email }
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: 60 }, sendToken);
            res.status(200);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ err });
    }
}


module.exports = { index, register, login }
