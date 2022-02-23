require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require('../model/User');

async function register (req, res) {
    try {const user = await User.checkAvailEmail(req.body.email)
            count = parseInt(user.count) // count = 0 if no existing account is registered with that email
            if(!!count){ // check if email already exists
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
        // if no user found gives 404 Not Found - error is catched at the very end
        
        try{const authed = bcrypt.compareSync(req.body.password, user.passwd)
        if (!!authed) {
            const payload = { username: user.username, email: user.email }
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" }, sendToken);
            res.status(200);
        } else {
            throw new Error('User could not be authenticated')  
        }
         } catch (err) {
        res.status(401).json(err.message);
        }
    } catch (err) {
    //console.log(err);
    res.status(404).json({ err });
    }
}

module.exports = { register, login }
