import React,{useState, useEffect} from 'react';
import {Typography, Box, FormControl} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ChatState } from '../../../Context/ChatProvider';
import Input from '@mui/material/Input';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import ProfileModal from './ProfileModal';
import ScrollableChat from '../../ScrollableChat';
import { getSender,getSenderFull } from './ChatLogics';

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

    const { user, selectedChat, setSelectedChat} = ChatState();
    console.log(selectedChat);

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
      

      console.log(messages);
      setMessages(data);
      setLoading(false);

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
    fetchMessages();
  },[selectedChat])

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

        <Typography sx={{ fontFamily:"Nunito", fontWeight:"500", marginLeft:"15px", fontSize:"30px"}} variant='h6' >{getSender(user, selectedChat.users)}</Typography>
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

        {loading?<CircularProgress sx={{position: 'relative', top: '50%', left: '50%',}} />:<>
            <div>
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