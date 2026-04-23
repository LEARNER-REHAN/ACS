import React, { useState } from "react";
import "../../styles/CategoryPage.css";

function GamingPage() {
  const [target, setTarget] = useState("");
  const [todayHours, setTodayHours] = useState("");

  const savedTarget = Number(localStorage.getItem("gamingTarget"));

  const history = JSON.parse(localStorage.getItem("gamingHistory")) || [];

  const latestRecord = history.length > 0 ? history[history.length - 1] : null;

  // Save Target
  const saveTarget = () => {
    const value = Number(target);

    if (!value || value <= 0 || value > 24) {
      alert("Target must be between 1-24 hours");
      return;
    }

    localStorage.setItem("gamingTarget", value);
    alert("Target saved!");
    setTarget("");
  };

  // Track Today
  const trackToday = () => {
    const value = Number(todayHours);

    if (!savedTarget) {
      alert("Set target first");
      return;
    }

    if (value < 0 || value > 24) {
      alert("Gaming hours must be between 0-24");
      return;
    }

    const updated = [...history];

    updated.push({
      date: new Date().toLocaleDateString(),
      hours: value,
    });

    localStorage.setItem("gamingHistory", JSON.stringify(updated));

    alert("Progress tracked!");
    setTodayHours("");
  };

  // Weekly Average
  const totalHours = history.reduce((sum, item) => sum + item.hours, 0);

  const avgHours =
    history.length > 0 ? (totalHours / history.length).toFixed(1) : 0;

  // Best Day
  const bestDay =
    history.length > 0 ? Math.min(...history.map((item) => item.hours)) : 0;

  // Worst Day
  const worstDay =
    history.length > 0 ? Math.max(...history.map((item) => item.hours)) : 0;

  // Streak
  const streak = history.filter((item) => item.hours <= savedTarget).length;

  // Relapse Detection
  const relapse =
    latestRecord && latestRecord.hours > savedTarget
      ? "⚠ Relapse Detected"
      : "✅ Stable";

  // Achievement Badge
  let badge = "Beginner";

  if (streak >= 30) {
    badge = "🏆 Champion";
  } else if (streak >= 15) {
    badge = "🥇 Warrior";
  } else if (streak >= 7) {
    badge = "🔥 Consistent";
  }

  // Export History
  const exportHistory = () => {
    const data = JSON.stringify(history, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "gaming-history.json";
    a.click();
  };

  return (
    <div className="category-page">
      <h2>🎮 Gaming Recovery</h2>

      <div className="card">
        <h3>🎯 Set Target</h3>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button onClick={saveTarget}>Save Target</button>
      </div>

      <div className="card">
        <h3>📊 Track Today</h3>
        <input
          type="number"
          value={todayHours}
          onChange={(e) => setTodayHours(e.target.value)}
        />
        <button onClick={trackToday}>Track Today</button>
      </div>

      <div className="card">
        <h3>📈 Advanced Analytics</h3>

        <p>
          Weekly Average:
          {avgHours} hrs
        </p>

        <p>
          Best Day:
          {bestDay} hrs
        </p>

        <p>
          Worst Day:
          {worstDay} hrs
        </p>

        <p>
          Success Streak:
          {streak} days
        </p>

        <p>
          Status:
          {relapse}
        </p>

        <p>
          Badge:
          {badge}
        </p>
      </div>

      <div className="card">
        <h3>💡 Recommendation</h3>

        <p>
          {latestRecord && latestRecord.hours > savedTarget
            ? "Reduce gaming by replacing it with outdoor activities."
            : "Great work! Keep maintaining balance."}
        </p>
      </div>

      <div className="card actions">
        <button onClick={exportHistory}>Export History</button>

        <button>Motivational Quote</button>
      </div>
    </div>
  );
}

export default GamingPage;
