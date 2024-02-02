const express = require("express");
const dotenv = require("dotenv");
const users = require("./chatData.json")
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;


app.get('/',(req , res)=>{
    res.send("hello from server")
})

app.get('/users',(req , res)=>{
    res.json(users);
})


app.get('/user/:id',(req , res)=>{
    const userById = users.find((user)=>user.id===Number(req.params.id));
    console.log(userById);
    res.send(userById);
})


app.listen(PORT,()=>console.log(`server started at port : ${PORT}`));