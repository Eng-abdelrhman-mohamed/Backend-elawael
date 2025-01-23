const express = require("express");
const app = express();
const CommunitySchema = require('../models/Community.model');

// get All Teachers
app.get('/getAll', async (req, res)=>{
    const Communities = await CommunitySchema.find({});
    res.json({data:Communities});
});

app.post('/create', async (req, res)=>{
    const { title, type, url } = req.body;
    const newCommunity = new CommunitySchema({
        title,
        type,
        url,
    });
    await newCommunity.save()
    res.send("finished");
});

module.exports = app