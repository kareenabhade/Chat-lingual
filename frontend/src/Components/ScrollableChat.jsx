import React, {useState} from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { setMsgMargin } from './Authentication/miscellaneous/ChatLogics';
import { ChatState } from '../Context/ChatProvider';


const ScrollableChat = ({messages}) => {
    const {user} = ChatState();
    const [originalMsg, setOriginalMsg] = useState(false);
   
  return (
    <ScrollableFeed 
        sx={{
        display:"flex",
        flexDirection:"column",
    }}  >
        {messages && messages.map((m,i)=>{
            const isSender = m.sender._id === user._id;
            console.log("isSender : ", isSender, m);
            const messageStyle = {
                backgroundColor:`${isSender? "#85C88A":(originalMsg?"#FAEED1":"#6FB2D2") }`,
                padding:"10px",
                borderRadius:"10px",
                margin:"5px 15px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight:"600",
                display:"flex",
                flexDirection:"column",
                width: "fit-content", 
                maxWidth: "max-content",
                marginLeft:setMsgMargin(messages,m,i,user._id),
            }

            const showOriginalContent = ()=>{
                setOriginalMsg(!originalMsg);
             }

           return <span key={i} style={messageStyle} onClick={!isSender?showOriginalContent:()=>{}} >
            {isSender?m.content:(originalMsg?m.content:m.translatedContent)}
            </span>
          
        })}
    </ScrollableFeed>
  )
}

export default ScrollableChat