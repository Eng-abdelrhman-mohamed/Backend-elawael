const mongoose = require('mongoose')

const BooksSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    photo_book:{
        required:true,
        type:String,
    },
    url_book:{
        required:true,
        type:String
    },
    science:{
        required:true,
        type:Boolean
    },
    literary:{
        required:true,
        type:Boolean
    },
    subject:{
        required:true,
        type:String
    },
    grade:{
        required:true,
        type:Number
    }
});

module.exports = mongoose.model("Book",BooksSchema)