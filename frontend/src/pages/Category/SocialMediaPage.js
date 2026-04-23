import React, { useState, useEffect } from "react";
import "../../styles/CategoryPage.css";

function SocialMediaPage() {
  const [target, setTarget] = useState(
    localStorage.getItem("socialTarget") || "",
  );

  const [screenTime, setScreenTime] = useState("");
  const [mood, setMood] = useState("");
  const [urge, setUrge] = useState("");
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("socialHistory")) || [];
    setHistory(saved);
  }, []);

  const saveTarget = () => {
    localStorage.setItem("socialTarget", target);
    setMessage(`🎯 Target: ${target} hrs/day`);
  };

  const trackToday = () => {
    const entry = {
      date: new Date().toLocaleDateString(),
      hours: Number(screenTime),
      mood,
      urge,
    };

    const updated = [...history, entry];
    setHistory(updated);
    localStorage.setItem("socialHistory", JSON.stringify(updated));

    if (Number(screenTime) <= Number(target)) {
      setMessage("🎉 Screen time target achieved!");
    }

    setScreenTime("");
    setMood("");
    setUrge("");
  };

  const emergencyHelp = () => {
    alert("Turn off notifications and go offline.");
  };

  return (
    <div className="category-page">
      <h2>📱 Social Media Recovery</h2>

      <div className="card">
        <input
          placeholder="Target screen time"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button onClick={saveTarget}>Save Target</button>
      </div>

      <div className="card">
        <input
          placeholder="Today's screen time"
          value={screenTime}
          onChange={(e) => setScreenTime(e.target.value)}
        />
        <input
          placeholder="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <input
          placeholder="Urge"
          value={urge}
          onChange={(e) => setUrge(e.target.value)}
        />
        <button onClick={trackToday}>Track Today</button>
      </div>

      <div className="card">
        <button onClick={emergencyHelp}>🚨 Emergency Help</button>
      </div>

      <p>{message}</p>
    </div>
  );
}

export default SocialMediaPage;
