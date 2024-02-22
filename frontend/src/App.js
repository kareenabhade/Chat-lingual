import "./index.css";
import {Routes, Route, Navigate} from "react-router-dom"
import {Container} from "@mui/material";
import { HomePage } from "./pages/HomePage";
import MainPage from "./Components/Authentication/MainPage";

function App() {
  return (
    <div className="app">
    <Container fixed >
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Container>
    </div>
  );
}

export default App;
