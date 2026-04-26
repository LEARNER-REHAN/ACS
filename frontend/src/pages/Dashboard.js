import React, { useState } from "react";
import Home from "./Home";
import DataEntry from "./DataEntry";
import About from "./About";
import ProgressPage from "./ProgressPage";

import SmokingPage from "./Category/SmokingPage";
import GamingPage from "./Category/GamingPage";
import SocialMediaPage from "./Category/SocialMediaPage";
import StreamingPage from "./Category/StreamingPage";
import AlcoholPage from "./Category/AlcoholPage";

import "../styles/dashboard.css";

function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);

  const analyzeData = (data) => {
    const usage = Number(data.usage);
    const craving = Number(data.craving);
    const mood = Number(data.mood);
    const category = data.category;

    let risk = "Low";
    let suggestion = "Keep going";

    if (usage > 5 || craving > 7) {
      risk = "High";
      suggestion = "Take a break and go outside.";
    } else if (usage > 3 || craving > 4) {
      risk = "Medium";
      suggestion = "Try meditation or relaxation.";
    }

    if (mood < 4) {
      suggestion += " Talk to a friend.";
    }

    // Save history
    const history = JSON.parse(localStorage.getItem("history")) || [];

    const score = 10 - usage + (10 - craving) + mood;
    const progress = Math.round((score / 30) * 100);

    history.push({
      date: new Date().toLocaleDateString(),
      category,
      usage,
      craving,
      mood,
      progress,
      risk,
    });

    localStorage.setItem("history", JSON.stringify(history));

    // Overall Progress
    let total = 0;
    history.forEach((entry) => {
      total += entry.progress;
    });

    const overallProgress = Math.round(total / history.length);
    localStorage.setItem("overallProgress", overallProgress);

    // Weekly improvement
    const previousProgress = Number(localStorage.getItem("progress")) || 0;

    const improvement = progress - previousProgress;

    localStorage.setItem("progress", progress);
    localStorage.setItem("improvement", improvement);

    // Streak
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem("lastCheckIn");

    let streak = Number(localStorage.getItem("streak")) || 0;

    if (!lastCheckIn) {
      streak = 1;
    } else {
      const last = new Date(lastCheckIn);
      const now = new Date(today);

      const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        streak = 1;
      }
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCheckIn", today);
    localStorage.setItem("riskLevel", risk);

    setResult({
      risk,
      suggestion,
      category,
    });

    // Redirect category page
    if (category === "Smoking") setPage("smoking");
    else if (category === "Gaming") setPage("gaming");
    else if (category === "Social Media") setPage("social");
    else if (category === "Streaming") setPage("streaming");
    else if (category === "Alcohol") setPage("alcohol");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="navbar">
        <div>
          <div className="logo">ACS</div>

          <ul className="nav-links">
            <li
              className={page === "home" ? "active" : ""}
              onClick={() => setPage("home")}
            >
              Home
            </li>

            <li
              className={page === "entry" ? "active" : ""}
              onClick={() => setPage("entry")}
            >
              Check-In
            </li>

            <li
              className={page === "progress" ? "active" : ""}
              onClick={() => setPage("progress")}
            >
              Progress
            </li>

            <li
              className={page === "about" ? "active" : ""}
              onClick={() => setPage("about")}
            >
              About
            </li>
          </ul>
        </div>

        <div className="nav-bottom">
          <span className="welcome">{user?.username || "User"}</span>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {page === "home" && (
          <>
            <Home setPage={setPage} />

            {result && (
              <div className="result-box">
                <h3>Latest Prediction</h3>

                <p>
                  <strong>Category:</strong> {result.category}
                </p>

                <p>
                  <strong>Risk:</strong> {result.risk}
                </p>

                <p>{result.suggestion}</p>
              </div>
            )}
          </>
        )}

        {page === "entry" && <DataEntry onAnalyze={analyzeData} />}
        {page === "progress" && <ProgressPage />}
        {page === "about" && <About />}

        {page === "smoking" && <SmokingPage />}
        {page === "gaming" && <GamingPage />}
        {page === "social" && <SocialMediaPage />}
        {page === "streaming" && <StreamingPage />}
        {page === "alcohol" && <AlcoholPage />}
      </div>
    </div>
  );
}

export default Dashboard;
