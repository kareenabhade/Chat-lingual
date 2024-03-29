import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const UserList = ({user, handleFunction}) => {
  return (
    <>
      <Box sx={{
        m:"5px 8px",
        display:"flex",
        justifyContent:"left",
        alignItems:"center",
        backgroundColor:"#E1F0DA",
        borderRadius:"5px",
        width:"95%",
        height:"60px",
        cursor:"pointer",
        '&:hover': {
          backgroundColor:'#D4E7C5'
        },
      }}  
        onClick={handleFunction}
      >
        <Avatar alt={user.name} src={user.pic} sx={{m:"0px 15px", border:"solid black 1px", borderColor:"#163020"}} />
        <div style={{display:"flex", flexDirection:"column"}}>
        <Typography variant='h6'sx={{fontFamily:"Nunito", fontWeight:"700"}} >{user.name}</Typography>     
        <Typography variant='h7'sx={{fontFamily:"Nunito", fontWeight:"700"}}>{user.email}</Typography> 
        </div>   
        </Box>
    </>
  )
}

export default UserList