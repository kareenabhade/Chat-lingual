import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FormControl,
        InputAdornment,
        Button } from '@mui/material';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword,setShowPassword] =  useState(false);
    const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(String(email).toLowerCase());
  };

function validatePassword(password) { 
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (passwordPattern.test(password)) return true;
   return false;
}


   const handleSubmit = async(event)=>{
    event.preventDefault();
       if(!email ||!password){
        toast.warn('All fields required ', {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          autoClose:  5000,
          position: "bottom-center",
        });
        return;
       }

          if (!validateEmail(email) ) {
      toast.warn('Incorrect email 👽', {
      position: "bottom-center",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      autoClose:  5000,
    });
    return;
    }

      if (!validatePassword(password)) {
      toast.warn('Password should contain - Minimum eight characters, at least one letter, one number and one special character', {
      position: "bottom-center",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      autoClose:  5000,
    });
    return;
    }


       const data = {
            email,
            password,
        };

   const headers = {
    "Content-Type": "application/json"
  };

  fetch("/api/user/login", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // On success

    setTimeout(()=>{
        toast.success('Login Successful 🚀', {
      position: "bottom-center",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      autoClose:  3000,
    });

    setTimeout(()=>{
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/mainpage");
    },3000)

    },50)
  })
  .catch(error => {
    // On error
    console.error(`Error : ${error}`)
    toast.error('Error occurred 😈', {
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
  });


   }



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

        <Button
            variant="contained"
            size='medium'
            color="primary"
            type="submit"
            sx={{ m:  4, fontSize: 'small' }}
            onClick={handleSubmit}
        > 
            Login
        </Button>

        <ToastContainer />
        </FormControl>

   </Stack>
  )
}

export default Login