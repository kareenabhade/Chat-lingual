import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoNotificationsOutline } from "react-icons/io5";
import { ChatState } from '../../../../Context/ChatProvider';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {notification, setNotification, user, selectedChat, setSelectedChat} = ChatState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
    <div style={{size:'5px'}}>
      <NotificationBadge count={notification.length} effect={Effect.SCALE}/>
    </div>
    <IoNotificationsOutline size={"25px"}/>

      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem sx={{
                   fontSize:"12px",
                   height:'10px',
                   fontWeight:"600"
               }} >{!notification.length && "no new notification"}</MenuItem>
      {notification.map((notif)=>{
         return <MenuItem sx={{
                   fontSize:"12px",
                   height:'10px',
                   fontWeight:"600",
                   p:2,
               }}
          key={notif._id}
            onClick={()=>{
              setSelectedChat(notif.chat);
              setNotification(notification.filter((n)=>n!==notif));
            }}
          >
            new message from{<span style={{color:"blue"}} >&nbsp;  { notif.sender.name}</span>}
          </MenuItem>
      })}
      </Menu>
    </div>
  );
}