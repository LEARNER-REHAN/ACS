import React, { useState, useEffect } from "react";
import "../../styles/SmokingPage.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function SmokingPage() {
  const today = new Date().toDateString();

  const lastDate = localStorage.getItem("smokingLastDate");
  const lastSmokeFreeDate = localStorage.getItem("lastSmokeFreeDate");

  let savedCigarettes = Number(localStorage.getItem("cigarettes")) || 0;

  let smokingHistory = JSON.parse(localStorage.getItem("smokingHistory")) || [];

  let savedStreak = Number(localStorage.getItem("smokeFreeStreak")) || 0;

  /* Reset cigarettes at new day */
  if (lastDate !== today) {
    if (lastDate) {
      smokingHistory.push({
        date: lastDate,
        cigarettes: savedCigarettes,
      });

      localStorage.setItem("smokingHistory", JSON.stringify(smokingHistory));
    }

    savedCigarettes = 0;

    localStorage.setItem("cigarettes", 0);
    localStorage.setItem("smokingLastDate", today);
  }

  /* Break streak if user misses a day */
  if (lastSmokeFreeDate) {
    const lastMarked = new Date(lastSmokeFreeDate);
    const current = new Date(today);

    const diffDays = Math.floor((current - lastMarked) / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      savedStreak = 0;
      localStorage.setItem("smokeFreeStreak", 0);
    }
  }

  const [cigarettes, setCigarettes] = useState(savedCigarettes);

  const [streak, setStreak] = useState(savedStreak);

  const [trigger, setTrigger] = useState("");

  const cigaretteCost = 20;
  const moneySpent = cigarettes * cigaretteCost;

  useEffect(() => {
    localStorage.setItem("cigarettes", cigarettes);

    localStorage.setItem("smokeFreeStreak", streak);
  }, [cigarettes, streak]);

  const addCigarette = () => {
    setCigarettes(cigarettes + 1);
  };

  const smokeFreeToday = () => {
    const alreadyMarked = localStorage.getItem("lastSmokeFreeDate") === today;

    if (cigarettes > 0) {
      alert("You smoked today. Smoke-free streak cannot increase.");
      return;
    }

    if (alreadyMarked) {
      alert("You already marked today as smoke-free.");
      return;
    }

    const newStreak = streak + 1;

    setStreak(newStreak);

    localStorage.setItem("smokeFreeStreak", newStreak);

    localStorage.setItem("lastSmokeFreeDate", today);

    alert("Great job! Smoke-free day added 🎉");
  };

  /* FIXED CHART DATA */
  const chartData = [
    ...smokingHistory.map((item) => ({
      date: item.date,
      cigarettes: item.cigarettes,
    })),

    {
      date: "Today",
      cigarettes: cigarettes,
    },
  ];

  return (
    <div className="smoking-page">
      <h1>🚬 Smoking Recovery Dashboard</h1>

      {/* Top Stats */}
      <div className="top-stats">
        <div className="stat-card">
          <h4>Cigarettes Today</h4>
          <h2>{cigarettes}</h2>
        </div>

        <div className="stat-card">
          <h4>Money Spent</h4>
          <h2>₹{moneySpent}</h2>
        </div>

        <div className="stat-card">
          <h4>Smoke Free Streak</h4>
          <h2>{streak} Days</h2>
        </div>
      </div>

      {/* Middle Layout */}
      <div className="middle-grid">
        {/* Left Section */}
        <div className="left-section">
          <div className="smoking-card">
            <h3>Daily Tracker</h3>

            <button onClick={addCigarette}>+ Smoked 1 Cigarette</button>
          </div>

          <div className="smoking-card">
            <h3>Smoke Free Goal</h3>

            <button onClick={smokeFreeToday}>Mark Today Smoke-Free</button>
          </div>

          <div className="smoking-card">
            <h3>Trigger Detection</h3>

            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
            >
              <option>Select Trigger</option>
              <option>Stress</option>
              <option>Friends</option>
              <option>Work Pressure</option>
              <option>Party</option>
            </select>

            {trigger && (
              <div className="trigger-help-box">
                <p>Trigger Detected: {trigger}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Chart */}
        <div className="chart-card">
          <h2>Smoking Trend</h2>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="cigarettes"
                  stroke="#ef4444"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No smoking history yet</p>
          )}
        </div>
      </div>

      {/* Bottom Insight */}
      <div className="insight-card">
        <h2>Health Recovery Milestones</h2>

        <p>24 Hours → Lung recovery starts</p>

        <p>7 Days → Breathing improves</p>

        <p>30 Days → Cravings reduce</p>
      </div>
    </div>
  );
}

export default SmokingPage;
