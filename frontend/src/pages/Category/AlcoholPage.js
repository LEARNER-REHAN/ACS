import React, { useState, useEffect } from "react";
import "../../styles/AlcoholPage.css";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function AlcoholPage() {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem("alcoholLastDate");

  let savedDrinks = Number(localStorage.getItem("drinks")) || 0;
  let alcoholHistory = JSON.parse(localStorage.getItem("alcoholHistory")) || [];

  // Reset drinks daily
  if (lastDate !== today) {
    if (lastDate) {
      alcoholHistory.push({
        date: lastDate,
        drinks: savedDrinks,
      });

      localStorage.setItem("alcoholHistory", JSON.stringify(alcoholHistory));
    }

    savedDrinks = 0;
    localStorage.setItem("drinks", 0);
    localStorage.setItem("alcoholLastDate", today);
  }

  const [drinks, setDrinks] = useState(savedDrinks);

  const [sobrietyStreak, setSobrietyStreak] = useState(
    Number(localStorage.getItem("sobrietyStreak")) || 0,
  );

  const [trigger, setTrigger] = useState("");

  const drinkCost = 300;
  const moneySpent = drinks * drinkCost;

  useEffect(() => {
    localStorage.setItem("drinks", drinks);
    localStorage.setItem("sobrietyStreak", sobrietyStreak);
  }, [drinks, sobrietyStreak]);

  const addDrink = () => {
    setDrinks(drinks + 1);
    setSobrietyStreak(0);
  };

  const soberToday = () => {
    if (drinks > 0) {
      alert("You drank today. Streak cannot increase.");
      return;
    }

    const alreadyMarked = localStorage.getItem("lastSoberDate") === today;

    if (alreadyMarked) {
      alert("Already marked today.");
      return;
    }

    const newStreak = sobrietyStreak + 1;

    setSobrietyStreak(newStreak);

    localStorage.setItem("sobrietyStreak", newStreak);

    localStorage.setItem("lastSoberDate", today);

    alert("Great job 🎉");
  };

  const chartData = [
    { name: "Consumed", value: drinks },
    { name: "Remaining Goal", value: Math.max(10 - drinks, 0) },
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  return (
    <div className="alcohol-page">
      <h1>🍺 Alcohol Recovery Dashboard</h1>

      {/* Top Stats */}
      <div className="alcohol-stats">
        <div className="stat-card">
          <h4>Drinks Today</h4>
          <h2>{drinks}</h2>
        </div>

        <div className="stat-card">
          <h4>Money Spent</h4>
          <h2>₹{moneySpent}</h2>
        </div>

        <div className="stat-card">
          <h4>Sobriety Streak</h4>
          <h2>{sobrietyStreak} Days</h2>
        </div>
      </div>

      {/* Main Grid */}
      <div className="alcohol-main-grid">
        {/* Left Section */}
        <div className="alcohol-card">
          <h2>Daily Alcohol Tracking</h2>

          <button onClick={addDrink}>+ Had a Drink</button>

          <button className="secondary-btn" onClick={soberToday}>
            Mark Today Sober
          </button>

          <div className="risk-box">
            {drinks >= 5 ? (
              <p className="danger">⚠ High Risk Drinking</p>
            ) : (
              <p className="safe">✅ Safe Level</p>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="chart-box">
          <h2>Consumption Breakdown</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={100} label>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trigger Section */}
      <div className="alcohol-card">
        <h2>Drinking Triggers</h2>

        <select value={trigger} onChange={(e) => setTrigger(e.target.value)}>
          <option>Select Trigger</option>
          <option>Stress</option>
          <option>Party</option>
          <option>Friends</option>
          <option>Depression</option>
        </select>

        {trigger && (
          <div className="trigger-help-box">
            <h4>Trigger: {trigger}</h4>

            {trigger === "Stress" && (
              <p>Try meditation, deep breathing, and hydration.</p>
            )}

            {trigger === "Party" && (
              <p>Choose soft drinks and avoid bar zones.</p>
            )}

            {trigger === "Friends" && <p>Stay with supportive people.</p>}

            {trigger === "Depression" && (
              <p>Talk to loved ones or seek help.</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Insight */}
      <div className="insight-card">
        <h2>Recovery Insight</h2>
        <p>
          {drinks >= 5
            ? "Your alcohol intake is high today. Consider avoiding triggers."
            : "Great progress today. Keep maintaining healthy habits."}
        </p>
      </div>
    </div>
  );
}

export default AlcoholPage;
