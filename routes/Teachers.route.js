const express = require("express");
const app = express();
const TeacherSchema = require('../models/Teachers.model');

// get All Teachers
app.get('/getAll', async (req, res)=>{
    const Teachers = await TeacherSchema.find({});
    res.json({data:Teachers});
});

app.post('/create', async (req, res)=>{
    const { photo, name, subject, faceBook, web, youtube } = req.body;
    const newTeacher = new TeacherSchema({
        photo,
        name,
        subject,
        faceBook,
        web,
        youtube
    });
    await newTeacher.save()
    res.send("finished");
});

module.exports = app