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

const server = app.listen(PORT,()=>console.log(`server started at port : ${PORT}`));

const io = require('socket.io')(server,{
    pingTimeout: 120000,
    cors:{
        origin:"http://localhost:3000",
    },
});

io.on("connection",(socket)=>{
    console.log('connected to socket.io');

    socket.on('setup', (userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("user connected");
    });

    
    socket.on("join chat", (room)=>{
        socket.join(room);
        console.log("User Joined Room : "+ room);
    });


    socket.on("new message", (newMsgRecieved)=>{
        var chat = newMsgRecieved.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user=>{
            if(user._id == newMsgRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMsgRecieved);
        })
    })


    socket.off("setup", ()=>{
        console.log("User disconnected");
        socket.leave(userData._id);
    });

});