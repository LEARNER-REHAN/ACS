import "../styles/landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <nav className="navbar">
        <h2 className="logo">Addiction Monitor</h2>

        {/* 👇 Middle Menu */}
        <div className="nav-links">
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <Link to="/login" className="login-btn">
          Login
        </Link>
      </nav>

      <div className="hero">
        <h1>Track. Understand. Overcome.</h1>
        <p>
          Monitor your habits, detect patterns, and get personalized
          recommendations to improve your life.
        </p>

        <Link to="/login" className="start-btn">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Landing;
