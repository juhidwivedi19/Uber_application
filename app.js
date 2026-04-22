const dotenv = require('dotenv');  //dotenv environmental variable
dotenv.config();

const cors=require('cors');
const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');  //cookie parser for parsing cookies
const connectToDb = require('./db/db'); //database connection
const userRoutes = require('./routes/user.routes');


connectToDb();  //database connection with server.js file

app.use(cors());
app.use(express.json());  //middleware for parsing json data
app.use(express.urlencoded({extended:true}));  //middleware for parsing urlencoded data
app.use(cookieParser());  //middleware for parsing cookies

app.get('/', (req,res) => {
    res.send('Hello World');
});


app.use('/users', userRoutes);  //user routes for user registration and login

module.exports=app;