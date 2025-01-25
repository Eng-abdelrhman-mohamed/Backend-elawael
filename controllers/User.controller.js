const userSchema = require("../models/Users.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


async function ResultValidation(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(404).json({errors:errors.array()})
    }
    else next()
}
// check if use exits or no
async function isUserExit(req, res, next){
    const { number } = req.body;
    const isUserExits = await userSchema.findOne({number});
    if(isUserExits) return res.json({error:'this userIs exit', Status:404, message:"this use is already exist"}).status(404)
    next()
}
// create token when user register
async function CreateToken(req, res, next){
    const {name, number} = req.body;
    const token = await jwt.sign({
        data: {
            name:name,
            number:number
        }
    }, process.env.secret_key);
    req.body.token = token

    next()
}
// create password hashed when use register 
async function hashPassword(req, res, next){
    const {password} = req.body;
    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(password, saltRounds)
    req.body.passwordHashed = passwordHashed

    next()
}

// check if token exits and valid
async function IsTokenValid(req, res, next){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ error: 'Access denied, token is missing' });
    }
    
    jwt.verify(token, process.env.secret_key, function(err, decoded) {
        if(!err) {
        req.body.token = token
        next()
        }
        else { return res.status(403).json({ error: 'Access denied, token is missing' }) };
    });
}

module.exports = {
    isUserExit,
    CreateToken,
    hashPassword,
    ResultValidation,
    IsTokenValid
}
