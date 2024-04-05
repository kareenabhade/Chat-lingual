import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Divider from '@mui/material/Divider';
import { getSender, getSenderPic } from './ChatLogics';
import { CircularProgress, Stack, Typography, Avatar } from '@mui/material';
import ChatLoading from './ChatLoading';
import { ChatState } from '../../../Context/ChatProvider';
import {Box } from '@mui/material';

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(false);
  const {user, chats, setChats, selectedChat, setSelectedChat, notification, setNotification} = ChatState();

  const fetchChats = async()=>{
    setLoading(true)
    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };

      const response = await fetch('/api/chats', config)
      if(!response.ok){
        throw new Error('error in fetching chats')
      }
     const data = await response.json();
     
     setLoading(false);
     setChats(data);
    } 
    catch (error) {
       console.error(`Error: ${error.message}`);
         toast.error(`${error.message} ☹️☹️`, {
         autoClose:  5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
         transition: Bounce,
         position: "bottom-center",
         });
    }
  }
  
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats();
  },[fetchAgain])
  

  function letterToColor(letter) {
     const hash = letter.charCodeAt(0) % 10;
     const colors = [ '#145374' , '#8294C4' , '#064ACB' , '#EA5455' ,'#3E7C17' ,
                      '#8F43EE' , '#FF4893' , '#8B9A46' , '#FF4B5C' , '#F07DEA' , ];
     return colors[hash];
  }

  if (!loggedUser || !chats) {
    return <ChatLoading />; 
  }


  return (
    <>
    <Box
       sx={{
        display:{xs:!selectedChat?"flex":"none", md:"flex"},
        flexDirection:"column",
        justifyContent:"left",
        alignItems:"center",
        p:1,
        m:1,
        width:{xs:"100%", md:"35%"},
        height:"87vh",
        borderRadius:"5px",
        backgroundColor:"white",
       }}
    >
    <Box sx={{m:2}} >MY CHATS</Box>
    <Divider sx={{color:"grey", width:"100%", mb:2}} />
    <Box sx={{width:"100%"}} >
      {chats?(
        <Stack  >
          { loading?<CircularProgress sx={{position: 'relative', top: '50%',  left: '50%',}} />:
            chats.map((chat)=>{
                      // const secondUser = chat.users[1];

              return <Box
              onClick={()=>{setSelectedChat(chat)
                            const updatedNotifications = notification.filter(notif => notif.chat._id !== chat._id);
                            setNotification(updatedNotifications);      }}
              key={chat._id}
              sx={{
                cursor:"pointer",
                color:"#3D3B40",
                backgroundColor: chat._id === selectedChat?._id ? "#D4E7C5" : "#F1EFEF",
                height:"50px",
                m:"5px",
                p:"5px",
                borderRadius:"5px",
                 '&:hover': {
                     backgroundColor: chat._id === selectedChat?._id ?'#D4E7C5':'#DDDDDD'
                  }, 
              }}>

              <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"start"
              }} >

              <div style={{ height: "25px", width: "25px", objectFit: 'cover', margin:"10px" }}>
               <Avatar
                  src={getSenderPic(loggedUser, chat.users)}
                  alt={getSender(loggedUser, chat.users) || "deletedUser"}
                  style={{ height: "100%", width: "100%", backgroundColor:letterToColor(getSender(loggedUser, chat.users) || "deletedUser") }}
               />
              </div>

              <div style={{display:"flex", flexDirection:"column"}} >
              <Typography variant='h6' sx={{
                  fontFamily: "Hind Siliguri, sans-serif",
                  fontWeight: 600,
                  m:"5px 0px 0px 1px",
              }} >
              {getSender(loggedUser, chat.users)||"deletedUser"}
              </Typography>  
              </div>
              </div> 
              
              
              </Box>
            })
          }

        </Stack>
      ):<ChatLoading />}
    </Box>
    </Box>
    <ToastContainer />
    </>
  )
}

export default MyChats