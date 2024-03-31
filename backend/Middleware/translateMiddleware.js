const User = require("../models/userModel.js");
const Chat = require("../models/chatModel.js");
const mongoose = require("mongoose");


const asyncHandler = require("express-async-handler");

const translate = asyncHandler(async(req, res, next)=>{

    const fetchReceiverId = (senderId, users)=>{
     if(users[0].equals(senderId)) {
         return users[1];
     } else if(users[1].equals(senderId)) {
         return users[0];
     } else {
         console.error("Sender not found in users array");
         return null;
     }
}

     try {
        const {chatId} = req.body;
        console.log(chatId)
        const objectChatId = new mongoose.Types.ObjectId(chatId);
        const chat = await Chat.findOne({ _id: objectChatId });
        const recieverId = fetchReceiverId(req.user._id,chat.users);

        const receiver = await User.findOne({_id:recieverId});
        const sender = await User.findOne({ _id: req.user._id });

         if (!sender || !receiver) {
            console.error("User document not found");
            return res.status(404).send("User document not found");
        }

        req.senderLanguage = sender.language;
        req.receiverLanguage = receiver.language;
       
        next();
     } catch (error) {
        console.error("error fetching in language");
         next(error);
     }
})

module.exports = {translate}