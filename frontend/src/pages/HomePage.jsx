import React from 'react';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { Container,Typography } from '@mui/material';
import Hometab from './Hometab';

export const HomePage = () => {
  
  return (<>
    <Container maxWidth='xs'
    sx={{backgroundColor:'white',
            height:'60px', 
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center',
            color:'black',
            borderRadius:"2px",
            marginTop:"50px"
            }}>
      <ChatRoundedIcon sx={{mr:1, color:"#3652AD"}}/>
      <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'Nunito',
              fontWeight: 700,
              color: '#3D3B40',
              textDecoration: 'none',
            }}
          >
            Chat-lingual
          </Typography>
    </Container>
    <Hometab />

  </> )
}
