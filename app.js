const dotenv = require('dotenv');  //dotenv environmental variable
dotenv.config();

const cors=require('cors');
const express=require('express');
const app=express();


const connectToDb = require('./db/db'); //database connection
connectToDb();  //database connection with server.js file

app.use(cors());


app.get('/', (req,res) => {
    res.send('Hello World');
});


module.exports=app;