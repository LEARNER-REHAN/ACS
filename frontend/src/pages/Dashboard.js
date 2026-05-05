import React, { useState, useEffect } from "react";
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

/* 🔥 DAILY RESET FUNCTION */
function resetIfNewDay() {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem("lastTrackedDate");

  if (lastDate !== today) {
    localStorage.setItem(
      "socialUsageData",
      JSON.stringify({ youtube: 0, instagram: 0, facebook: 0, twitter: 0 }),
    );

    localStorage.setItem(
      "gamingUsageData",
      JSON.stringify({
        roblox: 0,
        chess: 0,
        poki: 0,
        crazygames: 0,
        miniclip: 0,
        steam: 0,
      }),
    );

    localStorage.setItem(
      "streamingUsageData",
      JSON.stringify({
        netflix: 0,
        prime: 0,
        hotstar: 0,
        twitch: 0,
      }),
    );

    localStorage.setItem("cigarettes", 0);
    localStorage.setItem("drinks", 0);
    localStorage.setItem("lastTrackedDate", today);
  }
}

function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);

  useEffect(() => {
    resetIfNewDay();
  }, []);

  useEffect(() => {
    const interval = setInterval(resetIfNewDay, 60000);
    return () => clearInterval(interval);
  }, []);

  /* 🔥 ANALYSIS */
  const analyzeData = (data) => {
    const category = data.category;

    let totalUsage = 0;

    if (category === "Social Media") {
      const d = JSON.parse(localStorage.getItem("socialUsageData")) || {};
      totalUsage = Object.values(d).reduce((a, b) => a + b, 0) / 3600;
    } else if (category === "Gaming") {
      const d = JSON.parse(localStorage.getItem("gamingUsageData")) || {};
      totalUsage = Object.values(d).reduce((a, b) => a + b, 0) / 3600;
    } else if (category === "Streaming") {
      const d = JSON.parse(localStorage.getItem("streamingUsageData")) || {};
      totalUsage = Object.values(d).reduce((a, b) => a + b, 0) / 3600;
    } else if (category === "Smoking") {
      totalUsage = Number(localStorage.getItem("cigarettes")) || 0;
    } else if (category === "Alcohol") {
      totalUsage = Number(localStorage.getItem("drinks")) || 0;
    }

    totalUsage = Number(totalUsage.toFixed(2));

    /* 🔥 REAL RISK (FIXED) */
    let risk = "Low";
    let suggestion = "Keep going";

    if (
      (category === "Smoking" && totalUsage >= 6) ||
      (category === "Alcohol" && totalUsage >= 5) ||
      (["Social Media", "Gaming", "Streaming"].includes(category) &&
        totalUsage >= 5)
    ) {
      risk = "High";
      suggestion = "Reduce usage immediately. Take a break.";
    } else if (
      (category === "Smoking" && totalUsage >= 3) ||
      (category === "Alcohol" && totalUsage >= 2) ||
      (["Social Media", "Gaming", "Streaming"].includes(category) &&
        totalUsage >= 2)
    ) {
      risk = "Medium";
      suggestion = "You are close to overuse. Try limiting sessions.";
    }

    /* SAVE */
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
      date: new Date().toLocaleDateString(),
      category,
      usage: totalUsage,
    });
    localStorage.setItem("history", JSON.stringify(history));

    localStorage.setItem("riskLevel", risk);

    setResult({
      risk,
      suggestion,
      category,
      usage: totalUsage,
    });

    /* NAV */
    if (category === "Smoking") setPage("smoking");
    else if (category === "Gaming") setPage("gaming");
    else if (category === "Social Media") setPage("social");
    else if (category === "Streaming") setPage("streaming");
    else if (category === "Alcohol") setPage("alcohol");
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className="navbar">
        <div>
          <div className="logo">ACS</div>

          <ul className="nav-links">
            <li
              onClick={() => setPage("home")}
              className={page === "home" ? "active" : ""}
            >
              Home
            </li>
            <li
              onClick={() => setPage("entry")}
              className={page === "entry" ? "active" : ""}
            >
              Check-In
            </li>
            <li
              onClick={() => setPage("progress")}
              className={page === "progress" ? "active" : ""}
            >
              Progress
            </li>
            <li
              onClick={() => setPage("about")}
              className={page === "about" ? "active" : ""}
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

      {/* MAIN */}
      <div className="main-content">
        {page === "home" && (
          <>
            <Home setPage={setPage} />

            {result && (
              <div className="result-box">
                <h3>📊 Latest Prediction</h3>

                <div className="prediction-layout">
                  {/* LEFT */}
                  <div className="prediction-left">
                    <div className="info-card category">
                      <span>📂</span>
                      <h4>Category</h4>
                      <p>{result.category}</p>
                    </div>

                    <div
                      className={`info-card risk ${result.risk.toLowerCase()}`}
                    >
                      <span>
                        {result.risk === "High"
                          ? "🚨"
                          : result.risk === "Medium"
                            ? "⚠️"
                            : "✅"}
                      </span>
                      <h4>Risk Level</h4>
                      <p>{result.risk}</p>
                    </div>

                    <div className="info-card usage">
                      <span>⏱</span>
                      <h4>Usage</h4>
                      <p>
                        {result.usage}{" "}
                        {result.category === "Smoking" ||
                        result.category === "Alcohol"
                          ? "units"
                          : "hrs"}
                      </p>
                    </div>

                    <div className="info-card status">
                      <span>
                        {result.risk === "High"
                          ? "🔴"
                          : result.risk === "Medium"
                            ? "🟡"
                            : "🟢"}
                      </span>
                      <h4>Status</h4>
                      <p>
                        {result.risk === "High"
                          ? "Critical"
                          : result.risk === "Medium"
                            ? "Warning"
                            : "Good"}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div>
                    <div className="prediction-box">
                      <h4>💡 Recommendation</h4>
                      <p>{result.suggestion}</p>
                    </div>

                    <div className="prediction-box green">
                      <h4>🧠 Smart Tip</h4>
                      <p>
                        {result.risk === "High"
                          ? "Take a break immediately."
                          : result.risk === "Medium"
                            ? "Limit your sessions."
                            : "Keep it up!"}
                      </p>
                    </div>
                  </div>
                </div>
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
