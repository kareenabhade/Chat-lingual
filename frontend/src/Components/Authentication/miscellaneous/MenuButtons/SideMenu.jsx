import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FcSearch } from "react-icons/fc";
import ChatLoading from '../ChatLoading';
import UserList from '../UserAvatar/UserList';
import Divider from '@mui/material/Divider';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ChatState } from '../../../../Context/ChatProvider';



export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();


  const {user, setSelectedChat, chats, setChats} = ChatState();


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSearch = async()=>{
      if(!search){
      toast.warn('enter something to search', {
      position: "top-left",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      autoClose:  2000,
    });
    return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization:`Bearer ${user.token}`,
        },
      };

      const response = await fetch(`/api/user?search=${search}`, config);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Extract JSON from the response
    setLoading(false);
    console.log(data);
    setSearchResult(data);
    }
     catch (error) {
      toast.error('error in searching', {
      position: "bottom-left",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      autoClose:  2000,
    });
    return;
    }
  };

  const accessChat = async(userId)=>{
    try {
      setLoadingChat(true);
        
      const response = await fetch("api/chats", {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ userId }), // Assuming you want to send an object with userId
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'An error occurred');
    }

    const data = await response.json(); // Extract data from the response

    // Assuming data is the chat object you want to add
    if (!chats.find((c) => c._id === data._id)) {
      setChats((prevChats) => [data, ...prevChats]);
    }
      setSelectedChat(data);
      setLoadingChat(false);

    } 
    catch (error) {
      console.error(`Error: ${error.message}`);
         toast.error(`${error.message}⚡`, {
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

  };

  const DrawerList = (
    <Box sx={{ width:"100%" , mb:"20px", backgroundColor:"#F0F3FF"}} role="presentation" >
        
      <Typography variant='h6' sx={{m:"10px", pt:"30px",display:"flex", alignItems:"center", justifyContent:"center", fontFamily:'Nunito'}}>
        Search Users
      </Typography>
      <div style={{ display:'flex',
                    justifyContent:"space-around",
                    alignItems:"center", marginBottom:"20px"}}>
      <TextField id="filled-basic" label="User Name" variant="filled" size='small' value={search} onChange={(e)=>setSearch(e.target.value)} sx={{ m:"10px" }} />
      <Button variant="contained" width="10px" sx={{m:1}}  onClick={handleSearch}>Go</Button>
      </div>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button variant="outlined" 
       startIcon={<FcSearch />}
           sx={{
            backgroundColor:"white",
            color:"black",
            fontFamily: "Nunito, sans-serif",
            fontWeight:"700",
           }} onClick={toggleDrawer(true)}>Search</Button>
      <Drawer  open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        {loading?<ChatLoading />:(
          searchResult?.map((user)=>{
           return <UserList key={user._id} user={user} handleFunction={()=>accessChat(user._id)}/>
          })
        )}
        {loadingChat && <CircularProgress />}
      </Drawer>
      <ToastContainer />
    </div>
  );
}