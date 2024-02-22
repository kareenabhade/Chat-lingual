import React from 'react';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { Container,Typography } from '@mui/material';
import Hometab from './Hometab';

export const HomePage = () => {
  
  return (<>
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
      <ChatRoundedIcon sx={{mr:1, mt:1, color:"black"}}/>
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
