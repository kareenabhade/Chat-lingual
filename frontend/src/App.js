import "./index.css";
import {Routes, Route, Navigate} from "react-router-dom"
import { HomePage } from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import {Box} from '@mui/material'

function App() {
  return (
    <Box className="app" fixed>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chats" element={<ChatPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Box>
  );
}

export default App;
