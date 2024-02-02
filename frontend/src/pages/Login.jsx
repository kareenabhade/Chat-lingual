import React, { useState } from 'react';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import Typography from '@mui/material/Typography';
import { TextField, Button, Container } from '@mui/material';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic
  };

  return (
  <>
    <Container maxWidth='xs'
    sx={{backgroundColor:'#1976d2',
            height:'70px', 
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center',
            color:'white',
            marginTop:'100px',
            }}>
      <ChatRoundedIcon sx={{mr:2}}/>
      <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 700,
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Chat-lingual
          </Typography>

    </Container>
    <Container maxWidth="xs" style={{border:'3px black solid', padding:'30px',}}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

 
        <Button variant="contained" color="primary" type="submit" sx={{m:2}}>
          Login
        </Button>
      </form>
    </Container>
  </>
  );
};

export default Login;

