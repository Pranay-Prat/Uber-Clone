const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
const app=express();
const mapsRouter = require('./routes/maps.routes');
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const cors = require('cors');
const rideRoutes = require('./routes/ride.routes');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
connectToDb();
app.use(cors());
app.use(express.json());
app.use('/maps',mapsRouter);
app.use('/rides',rideRoutes);
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
console.log("app running");
app.get('/', (req,res)=>{
    res.send("Hello");
});
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
module.exports=app;