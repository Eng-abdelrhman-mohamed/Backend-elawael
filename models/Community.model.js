const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    type:{
        required:true,
        type:String
    },
    url:{
        required:true,
        type:String
    }
})


module.exports = mongoose.model('community',CommunitySchema)