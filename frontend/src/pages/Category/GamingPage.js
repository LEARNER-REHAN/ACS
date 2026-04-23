import React, { useState, useEffect } from "react";
import "../../styles/CategoryPage.css";

function GamingPage() {
  const [target, setTarget] = useState(
    localStorage.getItem("gamingTarget") || "",
  );

  const [hoursToday, setHoursToday] = useState("");
  const [mood, setMood] = useState("");
  const [urge, setUrge] = useState("");
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gamingHistory")) || [];
    setHistory(saved);
  }, []);

  const saveTarget = () => {
    localStorage.setItem("gamingTarget", target);
    setMessage(`🎯 Target: ${target} hrs/day`);
  };

  const trackToday = () => {
    const entry = {
      date: new Date().toLocaleDateString(),
      hours: Number(hoursToday),
      mood,
      urge,
    };

    const updated = [...history, entry];
    setHistory(updated);
    localStorage.setItem("gamingHistory", JSON.stringify(updated));

    if (Number(hoursToday) <= Number(target)) {
      setMessage("🎉 Gaming target achieved!");
    } else {
      setMessage("Try reducing gaming tomorrow 💪");
    }

    setHoursToday("");
    setMood("");
    setUrge("");
  };

  const avg =
    history.length > 0
      ? (history.reduce((a, b) => a + b.hours, 0) / history.length).toFixed(1)
      : 0;

  const emergencyHelp = () => {
    alert("Go outside, stretch, call a friend.");
  };

  return (
    <div className="category-page">
      <h2>🎮 Gaming Recovery</h2>

      <div className="card">
        <input
          placeholder="Target gaming hours/day"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button onClick={saveTarget}>Save Target</button>
      </div>

      <div className="card">
        <input
          placeholder="Today's gaming hours"
          value={hoursToday}
          onChange={(e) => setHoursToday(e.target.value)}
        />
        <input
          placeholder="Mood (1-10)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <input
          placeholder="Urge (1-10)"
          value={urge}
          onChange={(e) => setUrge(e.target.value)}
        />
        <button onClick={trackToday}>Track Today</button>
      </div>

      <div className="card">
        <h3>Average Gaming Hours: {avg}</h3>
      </div>

      <div className="card">
        <button onClick={emergencyHelp}>🚨 Emergency Help</button>
      </div>

      <p>{message}</p>
    </div>
  );
}

export default GamingPage;
