import React, { useState } from "react";
import Home from "./Home";
import DataEntry from "./DataEntry";
import About from "./About";

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

    setResult({ risk, suggestion, category });

    // 🔥 Redirect to category page
    if (category === "Smoking") setPage("smoking");
    else if (category === "Gaming") setPage("gaming");
    else if (category === "Social Media") setPage("social");
    else if (category === "Streaming") setPage("streaming");
    else if (category === "Alcohol") setPage("alcohol");
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
            <li onClick={() => setPage("about")}>About</li>
          </ul>
        </div>

        <div className="nav-right">
          <span>👋 {user?.username || "User"}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {page === "home" && (
          <>
            <Home />

            {result && (
              <div className="result-box">
                <h3>📊 Prediction</h3>
                <p>
                  <b>Category:</b> {result.category}
                </p>
                <p>
                  <b>{result.risk}</b>
                </p>
                <p>{result.suggestion}</p>
              </div>
            )}
          </>
        )}

        {page === "entry" && <DataEntry onAnalyze={analyzeData} />}
        {page === "about" && <About />}

        {/* CATEGORY PAGES */}
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
