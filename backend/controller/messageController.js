const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const languages = require('./language.js');

const sendMessage= asyncHandler(async(req,res)=>{
    const {content, chatId} = req.body;
    let translatedMessage = "";
    const senderLanguage = req.senderLanguage;
    const receiverLanguage = req.receiverLanguage;

    if(!content || !chatId ){
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    function languageCode(language) {
    // Correctly return the result of the comparison
    const languageObj = languages.find((data) => data.name === language);
    console.log(languageObj);
    if (languageObj) {
        return languageObj.code;
    } else {
        return 'en';
    }
    }


        try {
        const inputLanguage = languageCode(senderLanguage), outputLanguage = languageCode(receiverLanguage);
        console.log(inputLanguage, outputLanguage);
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
          content
        )}`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data[0].map((item) => item[0]).join("");
        console.log(result);
        translatedMessage = result;
          
      } catch (error) {
        console.error(error);
      }
    


    var newMessage = {
        sender : req.user._id,
        content: content,
        translatedContent: translatedMessage,
        chat: chatId,
    }

    try{
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message,{
            path:'chat.users',
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);
    } catch(error) {
        res.status(400);
        throw new Error(error.message);
    }

});

const allMessages = asyncHandler(async(req,res)=>{
    try{
        const messages = await Message.find({chat: req.params.chatId})
            .populate("sender","name pic email")
            .populate("chat");

    res.json(messages);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }

});

module.exports= {sendMessage, allMessages};