import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { setMsgMargin } from './Authentication/miscellaneous/ChatLogics';
import { ChatState } from '../Context/ChatProvider';


const ScrollableChat = ({messages}) => {
    const {user} = ChatState();

    console.log(messages);
  return (
    <ScrollableFeed sx={{
        display:"flex",
        flexDirection:"column",

    }} >
        {messages && messages.map((m,i)=>{
            const isSender = m.sender._id === user._id;
            console.log("isSender : "+isSender);
            const messageStyle = {
                backgroundColor:`${isSender? "#85C88A":"#6FB2D2" }`,
                padding:"10px",
                borderRadius:"10px",
                margin:"5px 15px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight:"600",
                display:"flex",
                flexDirection:"column",
                width: "fit-content", 
                maxWidth: "max-content",
                marginLeft:setMsgMargin(messages,m,i,user._id) || "15px",
            }
           return <span style={messageStyle}>
            {m.content}
            </span>
          
        })}
    </ScrollableFeed>
  )
}

export default ScrollableChat