import React from "react";
import "../styles/dashboard.css";

function Home({ setPage }) {
  const streak = Number(localStorage.getItem("streak")) || 0;
  const progress = Number(localStorage.getItem("overallProgress")) || 0;
  const improvement = Number(localStorage.getItem("improvement")) || 0;
  const risk = localStorage.getItem("riskLevel") || "Low";

  const history = JSON.parse(localStorage.getItem("history")) || [];

  const latestRecords = history.slice(-5).reverse();

  const handleEmergencySupport = () => {
    alert(
      "Emergency Support:\n\nCall trusted friend/family\nHelpline: 1800-599-0019\nTake immediate break from triggers.",
    );
  };

  const handleViewPlan = () => {
    alert(
      "Your Recovery Plan:\n\n1. Reduce daily usage by 10%\n2. Track mood daily\n3. Avoid triggers\n4. Exercise 30 mins",
    );
  };

  return (
    <div className="home-dashboard">
      <h1 className="dashboard-title">Welcome Back</h1>

      {/* Top Stats */}
      <div className="card-grid">
        <div className="card">
          <h4>Current Streak</h4>
          <p>{streak} Days</p>
        </div>

        <div className="card">
          <h4>Recovery Progress</h4>
          <p>{progress}%</p>
        </div>

        <div className="card">
          <h4>Weekly Improvement</h4>
          <p className={improvement >= 0 ? "positive" : "negative"}>
            {improvement}%
          </p>
        </div>

        <div className="card">
          <h4>Risk Level</h4>
          <p>{risk}</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="dashboard-row">
        <div className="card large-card">
          <h3>Recovery Progress Tracker</h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>

          <p>{progress}% completed</p>
        </div>

        <div className="card large-card">
          <h3>Quick Actions</h3>

          <button className="quick-btn" onClick={() => setPage("entry")}>
            Start Daily Check-In
          </button>

          <button className="quick-btn secondary-btn" onClick={handleViewPlan}>
            View Addiction Plan
          </button>

          <button
            className="quick-btn danger-btn"
            onClick={handleEmergencySupport}
          >
            Emergency Support
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card history-card">
        <h3>Recent Activity</h3>

        {latestRecords.length === 0 ? (
          <p>No activity yet.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Usage</th>
                <th>Mood</th>
                <th>Risk</th>
              </tr>
            </thead>

            <tbody>
              {latestRecords.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.category}</td>
                  <td>{item.usage}</td>
                  <td>{item.mood}</td>
                  <td>{item.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Motivation */}
      <div className="card motivation-card">
        <h3>Daily Motivation</h3>
        <p>Recovery isn't about perfection — it's about consistency.</p>
      </div>
    </div>
  );
}

export default Home;
