import React, { useState,useEffect } from 'react'
import ResponsiveAppBar from '../Components/ResponsiveAppBar'

function Chat() {
    const [chats, setChats] = useState([]);
    async function fetchData() {
    const response = await fetch('/users');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    let names = data.map(user => user.Name);
    setChats(names);
}


  useEffect(() => {
    try {
        fetchData();
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}, []);


  return (
    <>
    <ResponsiveAppBar />
        <ol>
            {chats.map((chat,index) =><li key={index}>{chat}</li>)}
        </ol>
    </>
  )
}

export default Chat