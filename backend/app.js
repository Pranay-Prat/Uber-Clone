const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
const app=express();
const userRoutes = require('./routes/user.routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
connectToDb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
console.log("app running");

app.get('/', (req,res)=>{
    res.send("Hello");
});
app.use('/users',userRoutes)
module.exports=app;