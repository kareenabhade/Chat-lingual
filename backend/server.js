const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const users = require("./chatData.json")
const app = express();
const connectDB = require("./config/db.js")
const userRoutes = require("./Routes/userRoutes.js")

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json())
// app.get('/users',(req , res)=>{
//     res.json(users);
// })

app.use('/api/user',userRoutes);

app.listen(PORT,()=>console.log(`server started at port : ${PORT}`));