const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db.js")
const userRoutes = require("./Routes/userRoutes.js");
const chatRoutes = require("./Routes/chatRoutes.js");
const messageRoutes = require("./Routes/messageRoutes.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());


app.use('/api/user',userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);


app.listen(PORT,()=>console.log(`server started at port : ${PORT}`));