import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Divider from '@mui/material/Divider';
import { getSender } from './ChatLogics';
import { CircularProgress, Stack, Typography } from '@mui/material';
import ChatLoading from './ChatLoading';
import { ChatState } from '../../../Context/ChatProvider';
import {Box } from '@mui/material';

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(false);
  const {user, chats, setChats, selectedChat, setSelectedChat} = ChatState();

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
     console.log('Parsed data:', data);
     
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
              onClick={()=>setSelectedChat(chat)}
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
               
              <Typography variant='h6' sx={{
                  fontFamily: "Hind Siliguri, sans-serif",
                  fontWeight: 600,
                  ml:1,
              }} >
              {getSender(loggedUser, chat.users)||"deletedUser"}
              </Typography>
              
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