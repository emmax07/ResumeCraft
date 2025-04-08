import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/LoginSignup/Login.jsx";
import Signup from "./Components/LoginSignup/Signup.jsx";
import Logout from "./Components/LoginSignup/Logout.jsx";
import Cards from "./Components/Cards/Cards.jsx";
import Resume1 from "./Components/Resume/ResumeTemplate1.jsx";
import Resume2 from "./Components/Resume/ResumeTemplate2.jsx";
import Resume3 from "./Components/Resume/ResumeTemplate3.jsx";
import Resume4 from "./Components/Resume/ResumeTemplate4.jsx";
import Resume5 from "./Components/Resume/ResumeTemplate5.jsx";
import Resume6 from "./Components/Resume/ResumeTemplate6.jsx";
import ResumePreview1 from "./Components/ResumePreview/ResumePreview1.jsx";
import ResumePreview2 from "./Components/ResumePreview/ResumePreview2.jsx";
import ResumePreview3 from "./Components/ResumePreview/ResumePreview3.jsx";
import ResumePreview4 from "./Components/ResumePreview/ResumePreview4.jsx";
import ResumePreview5 from "./Components/ResumePreview/ResumePreview5.jsx";
import ResumePreview6 from "./Components/ResumePreview/ResumePreview6.jsx";
import Home from "./Pages/Home.jsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import UsersDashboard from "./Components/UsersDashboard.jsx/UsersDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/users_dashboard" element={<UsersDashboard />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/resume_templates" element={<Cards />} />
        <Route path="/resume1" element={<Resume1 />} />
        <Route path="/resume2" element={<Resume2 />} />
        <Route path="/resume3" element={<Resume3 />} />
        <Route path="/resume4" element={<Resume4 />} />
        <Route path="/resume5" element={<Resume5 />} />
        <Route path="/resume6" element={<Resume6 />} />
        <Route path="/resume_preview1" element={<ResumePreview1 />} />
        <Route path="/resume_preview2" element={<ResumePreview2 />} />
        <Route path="/resume_preview3" element={<ResumePreview3 />} />
        <Route path="/resume_preview4" element={<ResumePreview4 />} />
        <Route path="/resume_preview5" element={<ResumePreview5 />} />
        <Route path="/resume_preview6" element={<ResumePreview6 />} />
      </Routes>
    </Router>
  );
}

export default App;
