require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require('../model/User');

async function register (req, res) {
    try {const user = await User.checkAvailEmail(req.body.email)
            console.log(parseInt(user.count)) 
            count = parseInt(user.count)
            if(!!count){
            res.sendStatus(409)
        }else{
            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(req.body.password, salt)
            await User.create({...req.body, password: hashed})
            res.status(201).json({msg: 'User created'})
        }
    } catch (err) {
        res.json({err})
    }
}

async function login (req, res) {
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){ throw new Error('No user with this email') }
        const authed = bcrypt.compareSync(req.body.password, user.passwd)
        if (!!authed) {
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

module.exports = { register, login }
