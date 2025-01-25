const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    avatar:{
        required:true,
        type:String,
        default:"https://i.ibb.co/Qc2WF1b/download.png"
    },
    name:{
        required:true,
        type:String,
        min:6,
        max:50
    },
    number:{
        required:true,
        type:String,
        unique:true,
    },
    password:{
        required:true,
        type:String,
    },
    token:{
        required:true,
        type:String
    }
});

module.exports = mongoose.model("user",UserSchema)