const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth/",userRoutes)

app.listen(process.env.PORT, ()=> {
    console.log(`Server now running on Port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("DB well connected")
    })
    .catch((err)=>{
        console.log(err.message)
    })
