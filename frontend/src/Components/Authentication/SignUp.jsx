import React,{useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [language, setLanguage] = useState("");
  const [pic,setPic] = useState();
  const [languageData, setLanguageData] = useState([]);
  const navigate = useNavigate();


  const languages = [ "Auto", "Afrikaans", "Albanian", "Arabic", "Armenian", "Azerbaijani", 
                    "Basque", "Belarusian", "Bulgarian", "Catalan", "Chinese (Simplified)", 
                    "Chinese (Traditional)", "Croatian", "Czech", "Danish", "Dutch", 
                    "English", "Estonian", "Filipino", "Finnish", "French", "Galician", 
                    "Georgian", "German", "Greek", "Haitian Creole", "Hebrew", "Hindi", 
                    "Hungarian", "Icelandic", "Indonesian", "Irish", "Italian", "Japanese", 
                    "Korean", "Latvian", "Lithuanian", "Macedonian", "Malay", "Maltese", 
                    "Norwegian", "Persian", "Polish", "Portuguese", "Romanian", "Russian", 
                    "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", 
                    "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh", "Yiddish" ];


const handleSubmit = async (event) => {
  event.preventDefault();

  // Validation
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);
  console.log("Language:", language);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(String(email).toLowerCase());
  };

function validatePassword(password) {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (passwordPattern.test(password)) return true;
   return false;
}

  if (!name|| !email|| !password|| !confirmPassword|| !language) {
    toast.warn('All fields required ❗', {
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
      toast.warn('Password should contain - Minimum eight characters, at least one letter, one number and one special character ', {
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



  if (password !== confirmPassword) {
    toast.warn('Password does not match ❗', {
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

  // Submit Logic
  let data = {
    name,
    email,
    password,
    language
  };

  if (pic) { data = { ...data, pic };  }

 
  try {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'An error occurred');
  }

  const successData = await response.json();
  // Handle success
  setTimeout(()=>{
      toast.success('Registration successful 🚀', {
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
    // setEmail(""); setPassword(""); 
    navigate("/chats");
    },3000)

    },50)} 
  catch (error) {
  // Handle error
  console.error(`Error: ${error.message}`);
  toast.error(`${error.message} 😠`, {
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

}


  function postDetails(pic){
    if(pic===undefined){
      toast('Image Error', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        position: "bottom-center",
        });
        return;
   }

   if(pic.type === "image/jpeg" || pic.type === "image/png"){
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "Chat-lingual");
    data.append("cloud_name", "dlxdukj6m");
    fetch("https://api.cloudinary.com/v1_1/dlxdukj6m/image/upload",{
      method:'post',
      body:data,
    }).then((res)=>res.json())
      .then(data=>{
          setPic(data.url.toString());
      })
      .catch((err)=>{
        console.log(err);
      });
   }
   else{
    toast('please select an image', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        position: "bottom-center",
        });
        return;
   }

  }

  useEffect(()=>{

    const fetchLanguage = async()=>{
      try {
          const headers = {
            'accept':'application/json',
          } 
          const response = await fetch('https://libretranslate.com/languages', 
                            {
                              headers:headers,
                            })
          const languageData = await response.json();
          setLanguageData(languageData);
       } catch (error) {
         console.log("errror in fetching language data : "+ error);
       }
    }

    fetchLanguage();
    
  },[])

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
          value={language}
          defaultValue="English"
          onChange={(e)=>setLanguage(e.target.value)}
          helperText="Please select your language"
          variant="filled"
          fullWidth
          required
          size='small'
          sx={{m:2}}
          InputLabelProps={{style: {fontSize:"small"}}}    
        >
          {languages.map((language,index) => (
            <MenuItem key={index} value={language} >
              {language} 
            </MenuItem>
          ))}
        </TextField>
           
      
           <Button variant="outlined" color="primary" component="label" size='small' sx={{width:"50%",marginTop:2, fontSize:"small"}}
                        startIcon={<CloudUploadIcon />} >
             Upload Image
             <input type="file" accept="image/*" onChange={(e)=>postDetails(e.target.files[0])} hidden />
            </Button>
        
     

       <Button
            variant="contained"
            size='medium'
            color="primary"
            type="submit"
            sx={{ m:  4, fontSize: 'small' }}
            onClick={handleSubmit}
        > 
            Sign Up
        </Button>

        <ToastContainer />

        </FormControl>
      </Stack>
  )
}

export default SignUp