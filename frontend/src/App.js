import "./index.css";
import {Routes, Route, Navigate} from "react-router-dom"
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Container} from "@mui/material";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div className="app">
    <Container fixed >
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chats" element={<Chat />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Container>
    </div>
  );
}

export default App;
