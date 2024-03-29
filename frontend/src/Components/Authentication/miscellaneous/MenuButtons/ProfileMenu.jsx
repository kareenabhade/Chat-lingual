import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { IoMdArrowDropdown } from "react-icons/io";
import { ChatState } from '../../../../Context/ChatProvider';
import ProfileModal from '../ProfileModal';
import {useNavigate} from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = ()=>{
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  const {user} = ChatState();
  return (
    <div>
      <Button sx={{backgroundColor:"#E0F4FF", display:"flex", justifyContent:'space-between'}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       
       <Avatar alt={user.name}  src={user.pic}
                  sx={{height:"25px",
                       width:"25px",
                       border:"solid 1px black",
                       backgroundColor:"#5B5B5B"
                      }}
          /> 
     
      <IoMdArrowDropdown />

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

        <MenuItem ><ProfileModal person={user} loginUser={true} /></MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}