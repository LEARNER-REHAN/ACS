import React, { useState } from "react";
import Home from "./Home";
import DataEntry from "./DataEntry";
import Apps from "./Apps";
import "../styles/dashboard.css";

function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);

  const analyzeData = (data) => {
    const usage = Number(data.usage);
    const craving = Number(data.craving);
    const mood = Number(data.mood);

    // ===== RISK =====
    let risk = "Low 🟢";
    let suggestion = "Keep going 👍";

    if (usage > 5 || craving > 7) {
      risk = "High 🔴";
      suggestion = "Take a break, go outside.";
    } else if (usage > 3 || craving > 4) {
      risk = "Medium 🟡";
      suggestion = "Try meditation.";
    }

    if (mood < 4) {
      suggestion += " Talk to a friend ❤️";
    }

    // ===== STREAK =====
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    let streak = Number(localStorage.getItem("streak")) || 0;

    if (!lastCheckIn) {
      streak = 1;
    } else {
      const last = new Date(lastCheckIn);
      const now = new Date(today);
      const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));

      if (diff === 1) streak += 1;
      else if (diff > 1) streak = 1;
    }

    localStorage.setItem("streak", String(streak));
    localStorage.setItem("lastCheckIn", today);

    // ===== DAILY PROGRESS =====
    const score = 10 - usage + (10 - craving) + mood;
    const progress = Math.round((score / 30) * 100);

    // ===== HISTORY STORAGE =====
    const history = JSON.parse(localStorage.getItem("history")) || [];

    history.push({
      date: new Date().toLocaleDateString(),
      usage,
      craving,
      mood,
      progress,
    });

    localStorage.setItem("history", JSON.stringify(history));

    // ===== OVERALL PROGRESS =====
    let total = 0;
    history.forEach((entry) => {
      total += entry.progress;
    });

    const overallProgress = Math.round(total / history.length);

    localStorage.setItem("overallProgress", String(overallProgress));

    // ===== IMPROVEMENT =====
    const previous = Number(localStorage.getItem("progress")) || 0;
    const improvement = progress - previous;

    localStorage.setItem("progress", String(progress));
    localStorage.setItem("improvement", String(improvement));

    localStorage.setItem("riskLevel", risk);
    // refresh UI
    window.dispatchEvent(new Event("focus"));

    setResult({ risk, suggestion });
    setPage("home");
  };

  return (
    <div className="dashboard">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <div className="logo">ACS</div>

          <ul className="nav-links">
            <li onClick={() => setPage("home")}>🏠 Home</li>
            <li onClick={() => setPage("entry")}>🧠 Daily Check-In</li>
            <li onClick={() => setPage("apps")}>📱 Apps</li>
          </ul>
        </div>

        <div className="nav-right">
          <span>👋 {user?.username || "User"}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="main-content">
        {page === "home" && (
          <>
            <Home />

            {result && (
              <div className="result-box">
                <h3>📊 Prediction</h3>
                <p>
                  <b>{result.risk}</b>
                </p>
                <p>{result.suggestion}</p>
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
