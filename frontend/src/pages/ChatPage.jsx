import React,{useState} from 'react'
import { ChatState } from '../Context/ChatProvider'
import Navbar from '../Components/Authentication/miscellaneous/Navbar';
import Box from '@mui/material/Box';
import ChatBox from '../Components/Authentication/miscellaneous/ChatBox';
import MyChats from '../Components/Authentication/miscellaneous/MyChats';


const ChatPage = () => {
   const {user} = ChatState();
   const [fetchAgain, setFetchAgain] = useState();

  return (
    <>
    {user && <Navbar />}
    <Box 
      sx={{
        display:"flex",
        justifyContent:"space-between",
        width:"100%",
       }
    }>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
    </Box>
    
    </>
  )
}

export default ChatPage