import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/LoginSignup/Login.jsx";
import Signup from "./Components/LoginSignup/Signup.jsx";
import Logout from "./Components/LoginSignup/Logout.jsx";
import Cards from "./Components/Cards/Cards.jsx";
import Resume from "./Components/Resume/Resume.jsx";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/resume_templates" element={<Cards />} />
        <Route path="/resume1" element={<Resume />} />
        <Route path="/resume2" element={<Resume />} />
        <Route path="/resume3" element={<Resume />} />
        <Route path="/resume4" element={<Resume />} />
        <Route path="/resume5" element={<Resume />} />
        <Route path="/resume6" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;
