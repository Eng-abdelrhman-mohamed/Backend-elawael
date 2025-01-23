const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    photo:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String
    },
    subject:{
        required:true,
        type:String,
    },
    faceBook:{
        required:true,
        type:String
    },
    web:{
        required:true,
        type:String
    },
    youtube:{
        required:true,
        type:String
    }
})


module.exports = mongoose.model('teacher',TeacherSchema)