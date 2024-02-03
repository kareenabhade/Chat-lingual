import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import MenuItem from '@mui/material/MenuItem';
import { languages } from './languageData';

import { FormControl,
        InputAdornment,
        Button } from '@mui/material';




const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword,setShowPassword] =  useState(false);
  const [showConfirmPassword,setShowConfirmPassword] =  useState(false);
  const [language, setLanguage] = useState("English");
  const [pic,setpic] = useState();

  function handleSubmit(){

  }

  function postDetails(pics){

  }

  return (
    <Stack spacing={2} >
        
      <FormControl sx={{
            justifyContent:"center",
            alignItems:"center",
            display:"flex",
           }}> 

        <TextField 
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin='normal'
          size='small'
          variant="outlined"
          required
          InputLabelProps={{style: {fontSize:"small"}}}    
          /> 
    
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

        <TextField
          label="ConfirmPassword"
          value={confirmPassword}
          type={!showConfirmPassword?'password':'text'}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          size='small'
          required
          InputLabelProps={{style: {fontSize:"small"}}}    
          InputProps={{
           endAdornment: (
            <InputAdornment position="end">
             <Button onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}>
                {!showConfirmPassword?<VisibilityOutlinedIcon fontSize='small'/>:<VisibilityOffOutlinedIcon fontSize='small'/>}
            </Button>
            </InputAdornment>
          ),
          }}
        /> 


        <TextField
          id="language"
          select
          label="Select"
          defaultValue="English"
          helperText="Please select your language"
          variant="filled"
          fullWidth
          required
          size='small'
          sx={{m:2}}
          InputLabelProps={{style: {fontSize:"small"}}}    
        >
          {languages.map((language,index) => (
            <MenuItem key={index} value={language.language_name} onChange={(e)=>setLanguage(e.target.value)}>
              {language.language_name} 
            </MenuItem>
          ))}
        </TextField>
           
      
           <Button variant="outlined" color="primary" component="label" size='small' sx={{width:"50%",marginTop:2, fontSize:"small"}}>
            <DriveFolderUploadIcon fontSize='small' sx={{mr:1}}/>
             Upload Image
             <input type="file" accept="image/*" onChange={(e)=>postDetails(e.target.files[0])} hidden />
            </Button>
        
     

        <Button size='medium' variant="contained" color="primary" type="submit" sx={{m:4, fontSize:'small'}}>
          Sign Up
        </Button>
        </FormControl>
      </Stack>
  )
}

export default SignUp