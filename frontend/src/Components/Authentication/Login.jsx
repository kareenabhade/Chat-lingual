import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { FormControl,
        InputAdornment,
        Button } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword,setShowPassword] =  useState(false);
  return (
    <Stack spacing={2}>
        
        <FormControl sx={{justifyContent:"center",
                          alignItems:"center",
                          display:"flex",
                        }}>    

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          size='small'
          required
          InputLabelProps={{style: {fontSize:"small"}}}    
        />

     
        <TextField
          label="Password"
          value={password}
          type={!showPassword?'password':'text'}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          size='small'
          required
          InputLabelProps={{style: {fontSize:"small"}}}    
          InputProps={{
           endAdornment: (
            <InputAdornment position="end">
             <Button onClick={()=>setShowPassword(!showPassword)}>
                {!showPassword?<VisibilityOutlinedIcon  fontSize='small'/>:<VisibilityOffOutlinedIcon  fontSize='small'/>}
            </Button>
            </InputAdornment>
          ),
          }}
        />

        <Button size='medium' variant="contained" color="primary" type="submit" sx={{m:4, fontSize:'small'}}>
          Login
        </Button>
        </FormControl>

   </Stack>
  )
}

export default Login