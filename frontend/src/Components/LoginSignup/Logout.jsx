import axios from "axios";

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout");
      alert(response.data.message);

      // Clear login state from localStorage
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
