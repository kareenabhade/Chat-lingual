import React,{useState, useEffect} from 'react';
import {Typography, Box, FormControl, Avatar} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ChatState } from '../../../Context/ChatProvider';
import Input from '@mui/material/Input';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import ProfileModal from './ProfileModal';
import ScrollableChat from '../../ScrollableChat';
import { getSender,getSenderFull, getSenderPic } from './ChatLogics';

import io from 'socket.io-client'; 

const ENDPOINT = 'http://localhost:5000';
var socket , selectedChatCompare;


const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    
    const [socketConnected, setSocketConnected] = useState(false);
    const { user, selectedChat, setSelectedChat, notification , setNotification} = ChatState();

  const fetchMessages = async()=>{
    if(!selectedChat) return;

    try {
      const config ={
        headers:{
        Authorization :`Bearer ${user.token}`,
      },
    }
      setLoading(true);
      const response = await fetch(`/api/messages/${selectedChat._id}`, config);
      const data = await response.json();
      
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);

    } catch (error) {
      console.error(`Error: ${error.message}`);
            toast.error(`Error in fetching message - ${error.message} 😠`, {
              autoClose:  5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              position: "top-center",
            });
    }

  }

  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.emit('setup',user);
    socket.on("connection",()=>setSocketConnected(true))
  },[])

    
  useEffect(()=>{
    fetchMessages();
    
    selectedChatCompare = selectedChat;

  },[selectedChat])
  


  useEffect(()=>{
    socket.on('message recieved',(newMsgRecieved)=>{
      if(!selectedChatCompare || selectedChatCompare._id !== newMsgRecieved.chat._id){
        // notification
        if(!notification.includes(newMsgRecieved)){
          setNotification([newMsgRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      }
      else{
        setMessages([...messages,newMsgRecieved]);
      }
    })

  })



  const sendMessage = async (e)=>{
      if(e.key === "Enter" && newMessage){
        try {
          const config = {
              "Content-Type":"application/json",
              Authorization:`Bearer ${user.token}`,
            }

          const msg = {   content:newMessage,
                          chatId:selectedChat._id,  }
          
          setNewMessage("");
          const response = await fetch('/api/messages', {
                   method:"POST",
                   headers:config,
                   body:JSON.stringify(msg)}
                  );
                   
                   const data = await response.json();

                   socket.emit('new message',data);
                   setMessages([...messages,data]);

        } catch (error) {
          console.error(`Error: ${error.message}`);
            toast.error(`Error in sending message - ${error.message} 😠`, {
              autoClose:  5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              position: "top-center",
            });
        }
      }

    }
  const typingHandler = (e)=>{
          setNewMessage(e.target.value)

    }

  return (
    <>
    <Box sx={{
        display:'flex',
        justifyContent:"center",
        width:"100%",
    }}>
        {!selectedChat?<Typography variant='h5' sx={{fontFamily:"Nunito", fontWeight:"600", mt:"30%"}}>
            👈 Select user to start the conversation
    </Typography>:
    <Box sx={{width:"100%", m:2}} >
      <Box sx={{display:"flex",
                justifyContent:"space-between",
                alignItems:"center"}}>
        <KeyboardBackspaceIcon size={30} sx={{
                display:{xs:"flex", md:"none"},
                margin:"15px",
                 }}  
        onClick={()=>{setSelectedChat("")}} />
        <div style={{display:"flex"}} >
        <Avatar sx={{m:"5px 0px 0px 10px", height:{xs:"25px", md:"33px"}, width:{xs:"25px", md:"33px"}, border:"double black 1px"}} src={getSenderPic(user, selectedChat.users)} />
        <Typography sx={{ fontFamily:"Nunito", fontWeight:"500", marginLeft:"15px", marginTop:"5px" , fontSize:{md:"25px", xs:"20px"}}} variant='h6' >{getSender(user, selectedChat.users)}</Typography>
        </div>
        <ProfileModal person={getSenderFull(user, selectedChat.users)} loginUser={false} />
      </Box>
      <Box sx={{
        backgroundColor:"#C7C8CC",
        height:"93%",
        m:"10px",
        borderRadius:"5px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }} >

        {loading?<CircularProgress size={80} sx={{p:"10px", position:"absolute", top:"50%", left:"45%"}}/>:<>
            <div style={{overflow:"auto"}} >
              <ScrollableChat messages={messages} />
            </div>
            </>}

         <FormControl onKeyDown={sendMessage} required sx={{
                    position:'relative',
                    display:'flex',
                    alignItem:"end",
                    }} >
            <Input hiddenLabel placeholder="  enter your message ..." variant="filled" value={newMessage} onChange={typingHandler} sx={{
                       backgroundColor:"#F0F0F0",
                       width:"95%",
                       height:"45px",
                       fontSize:"small",
                       m:"15px",
                       borderRadius:"5px",
                       }} />

       </FormControl>
      </Box>
      </Box>}
    </Box>
    <ToastContainer />
     </>
  )
}

export default SingleChat