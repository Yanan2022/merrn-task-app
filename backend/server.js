const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./model/taskModel")
const taskRoutes = require("./routes/taskRoute")
const cors = require("cors");

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/tasks',taskRoutes);
app.use(cors());


//les routes
app.get('/', (req, res)=>{
    res.send("Home page");
})



const PORT = process.env.PORT || 5000

mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server running on ${PORT}`);
        })
    })
    .catch((err)=>console.log(err))

