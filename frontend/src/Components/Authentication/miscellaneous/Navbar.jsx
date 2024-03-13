import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BasicMenu from './MenuButtons/BasicMenu';
import SideMenu from './MenuButtons/SideMenu';
import ProfileMenu from './MenuButtons/ProfileMenu';
import chatLogo from './chatLogo.png';


export default function Navbar() {
  return (
        <>
       <Box 
       sx={{
        height:"10%",
        position:"static",
        backgroundColor:"white",
        p:"10px 30px",
        boxShadow:"5px 5px 5px grey",
        marginBottom:"10px",
        display:"flex",
        justifyContent:"space-between"
    }}>
       
       <SideMenu />

        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <img style={{height:"40px", width:"45px", marginRight:"10px"}} src={chatLogo}/>
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
          </div>
     <div style={{display:"flex"}}>
     <BasicMenu />
     <ProfileMenu />
     </div>
    </Box>
             
        </>
      
  );
}