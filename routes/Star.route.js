const express = require('express');
const app = express();
const StarSchema = require('../models/stars.model');
const {body,validationResult} = require('express-validator')


// get book
app.get('/', async (req, res)=>{
    const {subject, grade}  = req.query;
    const stars = await StarSchema.find({grade:grade , subject:subject})
    res.status(200).json({data:stars})
})

// create book
app.post('/create',
    [
        body("title")
        .notEmpty()
        .withMessage('title must not be empty')
        .isLength({min:6})
        .withMessage("title must be over 6 words"),

        body("photo_book")
        .notEmpty()
        .withMessage('title must not be empty')
        .isLength({min:6})
        .withMessage("title must be over 6 words"),

        body("url_book")
        .notEmpty()
        .withMessage('title must not be empty')
        .isLength({min:6})
        .withMessage("title must be over 6 words"),

    ]
    , async (req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()) {
        res.status(404).json({errors:error.array()})
    }
    else{
        const {title, photo_book, url_book, science, literary, subject, grade } = req.body
        const star = new StarSchema({
            photo_book,
            title,
            url_book,
            science,
            literary,
            subject,
            grade
        })
        await star.save()
        res.json({"message":"nice"})   
    }
})

module.exports = app