import React, { useState, useEffect } from "react";
import "../../styles/CategoryPage.css";

function StreamingPage() {
  const [target, setTarget] = useState(
    localStorage.getItem("streamingTarget") || "",
  );

  const [watchHours, setWatchHours] = useState("");
  const [mood, setMood] = useState("");
  const [urge, setUrge] = useState("");
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("streamingHistory")) || [];

    setHistory(saved);
  }, []);

  const saveTarget = () => {
    if (!target) {
      alert("Enter target hours");
      return;
    }

    localStorage.setItem("streamingTarget", target);

    setMessage(`🎯 Target set: ${target} hrs/day`);
  };

  const trackToday = () => {
    if (!watchHours || !mood || !urge) {
      alert("Fill all fields");
      return;
    }

    const entry = {
      date: new Date().toLocaleDateString(),
      hours: Number(watchHours),
      mood,
      urge,
    };

    const updated = [...history, entry];

    setHistory(updated);

    localStorage.setItem("streamingHistory", JSON.stringify(updated));

    if (Number(watchHours) <= Number(target)) {
      setMessage("🎉 Great! Streaming target achieved!");
    } else {
      setMessage("Try reducing binge watching tomorrow 💪");
    }

    setWatchHours("");
    setMood("");
    setUrge("");
  };

  const totalHours = history.reduce((sum, item) => sum + item.hours, 0);

  const average =
    history.length > 0 ? (totalHours / history.length).toFixed(1) : 0;

  const emergencyHelp = () => {
    alert("Take a break, go outside, read a book, avoid binge watching.");
  };

  return (
    <div className="category-page">
      <h2>📺 Streaming Recovery</h2>

      {/* Target */}
      <div className="card">
        <h3>🎯 Set Target</h3>

        <input
          type="number"
          placeholder="Target watch hours/day"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <button onClick={saveTarget}>Save Target</button>
      </div>

      {/* Daily Tracking */}
      <div className="card">
        <h3>📊 Track Today</h3>

        <input
          type="number"
          placeholder="Today's watch hours"
          value={watchHours}
          onChange={(e) => setWatchHours(e.target.value)}
        />

        <input
          type="number"
          placeholder="Mood (1-10)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <input
          type="number"
          placeholder="Urge (1-10)"
          value={urge}
          onChange={(e) => setUrge(e.target.value)}
        />

        <button onClick={trackToday}>Track Today</button>
      </div>

      {/* Analytics */}
      <div className="card">
        <h3>📈 Analytics</h3>

        <p>
          Days Tracked:
          {history.length}
        </p>

        <p>
          Average Watch Hours:
          {average}
        </p>
      </div>

      {/* History */}
      <div className="card">
        <h3>📅 History</h3>

        {history.map((item, index) => (
          <div key={index}>
            {item.date} —{item.hours} hrs | Mood: {item.mood}| Urge:
            {item.urge}
          </div>
        ))}
      </div>

      {/* Emergency */}
      <div className="card actions">
        <button onClick={emergencyHelp}>🚨 Emergency Help</button>
      </div>

      {message && (
        <div className="card">
          <h3>Status</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default StreamingPage;
