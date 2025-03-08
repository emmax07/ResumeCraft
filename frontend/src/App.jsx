import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/LoginSignup/Login.jsx";
import Signup from "./Components/LoginSignup/Signup.jsx";
import Logout from "./Components/LoginSignup/Logout.jsx";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
