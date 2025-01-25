const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const userSchema = require("../models/Users.model");
const { body } = require('express-validator');

const {isUserExit, CreateToken, hashPassword, ResultValidation} = require('../controllers/User.controller'); 
const { IsTokenValid } = require('../controllers/User.controller');


app.post('/register',
    [
    body('name')
        .notEmpty()
        .withMessage('name must not be empty')
        .isLength({min:6})
        .withMessage('name must be at least 6'),
    body("number")
        .notEmpty()
        .withMessage('number must not be empty')
        .isLength({min:11, max:11})
        .withMessage('inValid number')
        .matches(/^01\d{9}$/)
        .withMessage('inValid number'),
    body("password")
        .notEmpty()
        .withMessage('password must not be empty')
        .isLength({min:8})
        .withMessage('password must be at least 8')
    ]
    , ResultValidation
    , isUserExit
    , CreateToken
    , hashPassword
    , async(req, res)=>{
    const {name, number, passwordHashed, token} = req.body;
        const user = new userSchema({
            name,
            number,
            password:passwordHashed,
            token:token
        })
        await user.save()
        res.json([{data:token, Status:200, message:"create User have been done"}]).status(200)
})

app.post('/login',
    [
    body("number")
        .notEmpty()
        .withMessage('number must not be empty')
        .isLength({min:11, max:11})
        .withMessage('inValid number')
        .matches(/^01\d{9}$/)
        .withMessage('inValid number'),
    body("password")
        .notEmpty()
        .withMessage('password must not be empty')
        .isLength({min:8})
        .withMessage('password must be at least 8')
    ]
,ResultValidation
, async(req, res)=>{
    const {number , password} = req.body;
    const user = await userSchema.findOne({number});
    if(user){
        bcrypt.compare(password, user.password, async (err, result)=>{
            if(result){
                res.json([{data:user.token, Status:200, message:"create User have been done"}]).status(200)
            }
            else{
                res.status(404).json({error:"password or number is wrng"})
            }
        })
    }else{
        res.status(404).json({error:"password or number is wrong"})
    }

})

app.put('/edit',
    [
    body('avatar')
        .notEmpty()
        .withMessage('name must be at least 6'),
    body('name')
        .notEmpty()
        .withMessage('name must not be empty')
        .isLength({min:6})
        .withMessage('name must be at least 6'),
    ]
    ,ResultValidation
    ,IsTokenValid,
    async(req, res)=>{
    const {avatar ,name , token} = req.body
    const user = await userSchema.findOne({token})
    if(user){
        user.avatar = avatar;
        user.name = name;
        user.number = user.number;
        user.password = user.password;
        user.token = user.token;
        await user.save()
        res.json({message:"user have been updated"}).status(200)
    }else{
        res.json({error:"invalid token"}).status(403)
    }

})

module.exports = app;