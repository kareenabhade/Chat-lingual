import React,{useState} from 'react';
import { ChatState } from '../../../Context/ChatProvider';
import {Box, Typography} from '@mui/material';
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedChat} = ChatState();
  return (
    <>
    <Box sx={{
      display:{xs:selectedChat?"flex":"none", md:"flex"},
      height:"87vh",
      backgroundColor:"white",
      width:"100%",
      p:1,
      m:1,
      borderRadius:"5px",
      justifyContent:"center",
      position:"relative",
    }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      
    </Box>
    </>
  )
}

export default ChatBox