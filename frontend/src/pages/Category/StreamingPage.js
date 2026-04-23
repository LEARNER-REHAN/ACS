import React, { useState } from "react";
import "../../styles/CategoryPage.css";

function StreamingPage() {
  const [target, setTarget] = useState("");
  const [todayHours, setTodayHours] = useState("");

  const savedTarget = Number(localStorage.getItem("streamingTarget"));
  const history = JSON.parse(localStorage.getItem("streamingHistory")) || [];

  const latest = history.length > 0 ? history[history.length - 1] : null;

  const saveTarget = () => {
    const value = Number(target);

    if (!value || value <= 0 || value > 24) {
      alert("Target must be 1-24 hrs");
      return;
    }

    localStorage.setItem("streamingTarget", value);
    alert("Target saved!");
    setTarget("");
  };

  const trackToday = () => {
    const value = Number(todayHours);

    if (!savedTarget) {
      alert("Set target first");
      return;
    }

    if (value < 0 || value > 24) {
      alert("Hours must be 0-24");
      return;
    }

    const updated = [...history];
    updated.push({
      date: new Date().toLocaleDateString(),
      hours: value,
    });

    localStorage.setItem("streamingHistory", JSON.stringify(updated));

    alert("Tracked!");
    setTodayHours("");
  };

  const avg =
    history.length > 0
      ? (history.reduce((a, b) => a + b.hours, 0) / history.length).toFixed(1)
      : 0;

  const best =
    history.length > 0 ? Math.min(...history.map((h) => h.hours)) : 0;

  const worst =
    history.length > 0 ? Math.max(...history.map((h) => h.hours)) : 0;

  const streak = history.filter((h) => h.hours <= savedTarget).length;

  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "streaming-history.json";
    a.click();
  };

  return (
    <div className="category-page">
      <h2>📺 Streaming Recovery</h2>

      <div className="card">
        <h3>Set Target</h3>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button onClick={saveTarget}>Save Target</button>
      </div>

      <div className="card">
        <h3>Track Today</h3>
        <input
          type="number"
          value={todayHours}
          onChange={(e) => setTodayHours(e.target.value)}
        />
        <button onClick={trackToday}>Track</button>
      </div>

      <div className="card">
        <h3>Analytics</h3>
        <p>Average: {avg} hrs</p>
        <p>Best Day: {best} hrs</p>
        <p>Worst Day: {worst} hrs</p>
        <p>Streak: {streak} days</p>
      </div>

      <div className="card actions">
        <button onClick={exportHistory}>Export History</button>
      </div>
    </div>
  );
}

export default StreamingPage;
