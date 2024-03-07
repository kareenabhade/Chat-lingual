import React,{useState} from 'react';
import {Typography, Box} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ChatState } from '../../../Context/ChatProvider';
import ProfileModal from './ProfileModal';

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat} = ChatState();
    const [recieverProfile, setRecieverProfile] = useState(false);
    console.log(selectedChat);
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

        <Typography sx={{ fontFamily:"Nunito", fontWeight:"600", marginLeft:"15px"}} variant='h6' >{selectedChat.users[1].name}</Typography>
        <ProfileModal person={selectedChat.users[1]} loginUser={false} />
      </Box>
      <Box sx={{
        backgroundColor:"#C7C8CC",
        height:"90%",
        m:"10px",
        borderRadius:"5px"
      }} >

      </Box>
      </Box>}
    </Box>
     </>
  )
}

export default SingleChat