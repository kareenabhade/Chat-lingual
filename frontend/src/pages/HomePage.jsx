import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { Container,Typography } from '@mui/material';
import Hometab from './Hometab';
import chatLogo from '../Components/Authentication/miscellaneous/chatLogo.png'

export const HomePage = () => {
    const navigate = useNavigate();

    useEffect(()=>{
       const user = JSON.parse(localStorage.getItem("userInfo"));
        
       if(user){
         navigate('/chats');
       }
    }, [navigate])
  
  return (
  <>
    <Container maxWidth='xs'
    sx={{   p:3,
            backgroundImage: "linear-gradient( #525CEB,#40A2D8)",
            height:'60px', 
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center',
            color:'black',
            borderTopLeftRadius:"8px",
            borderTopRightRadius:"8px",
            marginTop:"50px"
            }}>
      {/* <ChatRoundedIcon sx={{mr:1, mt:1, color:"black"}}/> */}
      <img style={{height:"30px", width:"35px", marginRight:"10px"}} src={chatLogo}/>

      <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'Nunito',
              fontWeight: "bolder",
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Chat-lingual
          </Typography>
    </Container>
    <Hometab />

  </> )
}
