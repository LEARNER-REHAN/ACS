import React, { useState } from "react";
import Home from "./Home";
import DataEntry from "./DataEntry";
import Apps from "./Apps";
import "../styles/dashboard.css";

function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState("home");

  // ✅ NEW: Prediction result state
  const [result, setResult] = useState(null);

  // ✅ NEW: Analysis logic
  const analyzeData = (data) => {
    const usage = Number(data.usage);
    const craving = Number(data.craving);
    const mood = Number(data.mood);

    let risk = "Low 🟢";
    let suggestion = "Keep going 👍";

    if (usage > 5 || craving > 7) {
      risk = "High 🔴";
      suggestion = "Take a break, go outside, avoid triggers.";
    } else if (usage > 3 || craving > 4) {
      risk = "Medium 🟡";
      suggestion = "Try meditation or reduce screen time.";
    }

    if (mood < 4) {
      suggestion += " Talk to a friend or relax ❤️";
    }

    setResult({ risk, suggestion });
    setPage("home"); // optional: go back to home after analyze
  };

  return (
    <div className="dashboard">
      {/* ===== NAVBAR ===== */}
      <div className="navbar">
        <div className="nav-left">
          <div className="logo">ACS</div>

          <ul className="nav-links">
            <li
              className={page === "home" ? "active" : ""}
              onClick={() => setPage("home")}
            >
              🏠 Home
            </li>

            <li
              className={page === "entry" ? "active" : ""}
              onClick={() => setPage("entry")}
            >
              📊 Daily Check-In
            </li>

            <li
              className={page === "apps" ? "active" : ""}
              onClick={() => setPage("apps")}
            >
              📱 Apps
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <span className="welcome">
            👋 Welcome, <b>{user?.username || "User"}</b>
          </span>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content">
        {page === "home" && (
          <>
            <Home />

            {/* ✅ SHOW RESULT HERE */}
            {result && (
              <div className="result-box">
                <h3>Prediction Result</h3>
                <p>
                  Risk Level: <b>{result.risk}</b>
                </p>
                <p>Recommendation: {result.suggestion}</p>
              </div>
            )}
          </>
        )}

        {page === "entry" && <DataEntry onAnalyze={analyzeData} />}

        {page === "apps" && <Apps />}
      </div>
    </div>
  );
}

export default Dashboard;
