import React, { useState, useContext} from 'react';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import Typography from '@mui/material/Typography';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container } from '@mui/material';
import { AuthContext } from '../Context/AuthContext';

const Register = () => {
  const {setRegisterInfo} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic
    setRegisterInfo({
      name:name,
      email:email,
      password:password,
      language:language,
    })
    

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
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        
  <FormControl fullWidth>
  <InputLabel id="language-select-label">Language</InputLabel>
  <Select
    labelId="language-select-label"
    id="language-select-label"
    value={language}
    label="Language"
    onChange={(e) => setLanguage(e.target.value)}
  >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem>
  </Select>
</FormControl>

 
        <Button variant="contained" color="primary" type="submit" sx={{m:2}}>
          Register
        </Button>
      </form>
    </Container>
  </>
  );
};

export default Register;

