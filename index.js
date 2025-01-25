require('dotenv').config();

const express = require('express');
const app = express();
const TeacherRoute = require('./routes/Teachers.route');
const CommunityRoute = require('./routes/Community.route');
const UserRoute = require('./routes/Users.route');
const mongoose = require('mongoose');
const cors = require('cors');


// coonect dataBase
mongoose.connect(process.env.dataBase)
    .then(()=>{
        console.log('dataBase is work');
    })
    .catch(()=>{
        console.log('dataBase doesnot work')
    })

app.use(cors());
app.use(express.json());

// routes
app.use('/teachers',TeacherRoute);
app.use('/communities',CommunityRoute);
app.use('/user',UserRoute);


// app
app.get('/',(req, res)=>{
    res.send('hello world')
})




app.listen(3001,()=>{
    console.log('server is work');
})