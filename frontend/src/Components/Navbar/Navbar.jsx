import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../LoginSignup/Logout.jsx";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in which could be from localStorage or session
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <nav>
      <ul>
        <li className="home-link">
          <Link to="/">Home</Link>
        </li>
        <li className="resume_templates-link">
          <Link to="/resume_templates">ResumeTemplates</Link>
        </li>
        {isLoggedIn ? (
          <li className="logout-button">
            <Logout /> {/* Logout button */}
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link> {/* Login link */}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
