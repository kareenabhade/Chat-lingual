import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from '../Components/Authentication/Login';
import SignUp from '../Components/Authentication/SignUp';


export default function Hometab() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xs" sx={{
            backgroundColor:'white',
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center',
            color:'black',
            marginTop:"5px",
            fontFamily:"Nunito",
            borderBottomLeftRadius:"8px",
            borderBottomRightRadius:"8px",
    }}>
    <Box sx={{ width: '100%',marginTop:"5px"}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',
                  // display:'flex', 
                  // justifyContent:'center', 
                  // alignItems:'center',
                    }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            <Tab sx={{width:"50%"}} label="Login" value="1" />
            <Tab sx={{width:"50%"}} label="SignUp" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><Login /></TabPanel>
        <TabPanel value="2"><SignUp /></TabPanel>
      </TabContext>
    </Box>
    </Container>
  );
}