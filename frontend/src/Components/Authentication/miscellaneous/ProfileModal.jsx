import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#E0F4FF',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display:"flex",
  flexDirection:"column", 
  justifyContent:"center", 
  alignItems:"center"
};

export default function ProfileModal({person, loginUser}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

  return (
    <div>
      {  (loginUser)?
        <div style={{color:"black", fontFamily:"Nunito, sans-serif" , }}
       onClick={handleOpen}>Profile</div>:
       <VisibilityIcon sx={{marginRight:"15px"}} onClick={handleOpen} />
      }
      
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{fontFamily:"Josefin Sans, sans-serif", fontWeight:"700"}}>
            {person.name}
          </Typography>

          <Avatar alt={person.name}  src={person.pic ? person.pic :"backend/models/userDefault.png"}
                  sx={{height:"120px",
                       width:"120px",
                       margin:"20px 0px 20px",
                       border:"solid 2px black",
                       backgroundColor:"#5B5B5B"
                      }}
          /> 
          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            {person.email}
          </Typography>
          <Typography sx={{ mt: 1 }}  >language : {person.language}</Typography>
        </Box>
      </Modal>
    </div>
  );
}