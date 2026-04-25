import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <div className="landing-navbar">
        <div className="landing-logo">
          Addiction <br />
          Monitor
        </div>

        <button className="nav-login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        {/* Left Side */}
        <div className="hero-left">
          <h1>Track. Understand. Overcome.</h1>

          <p>
            Monitor your habits, detect addiction patterns, and receive smart
            recovery recommendations to build a healthier lifestyle.
          </p>

          <button className="hero-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>

        {/* Right Side */}
        <div className="hero-right">
          <div className="hero-card">
            <h3>Your Recovery Features</h3>

            <ul>
              <li>✅ Addiction Tracking</li>
              <li>✅ AI Risk Prediction</li>
              <li>✅ Daily Habit Monitoring</li>
              <li>✅ Recovery Progress Reports</li>
              <li>✅ Emergency Support</li>
              <li>✅ Personalized Recovery Plans</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
