import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ChatLoading() {
  return (
    <Box sx={{ display:"flex", flexDirection:"column",justifyContent:"flex-start", alignItems:"center"
    }}>
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave" />
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave" />
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave" />
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave" />
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave" />
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave" />
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave" />
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave" />
      <Skeleton variant='rounded' width={300} height={60} sx={{mb:"5px"}} animation="wave"/>
    </Box>
  );
}