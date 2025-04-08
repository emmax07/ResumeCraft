import { Link } from "react-router-dom"; // Import the Link component from React Router
import "./AdminDashboard.css";

const cards = [
  { title: "Users", link: "/users", icon: "👥", color: "blue" },
  { title: "Resumes", link: "/resumes", icon: "💼", color: "green" },
  {
    title: "Resume Templates",
    link: "/resume_templates",
    icon: "📝",
    color: "orange",
  },
  { title: "Errors", link: "/errors", icon: "⚠️", color: "red" },
];

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-card-column">
        {cards.map((card, idx) => (
          <Link
            to={card.link}
            key={idx}
            className={`dashboard-card card-${card.color}`}
          >
            <div className="card-info">
              <h2 className="card-title">{card.title}</h2>
            </div>
            <div className="card-icon">{card.icon}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
