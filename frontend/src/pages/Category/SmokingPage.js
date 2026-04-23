import React, { useState, useEffect } from "react";
import "../../styles/CategoryPage.css";

function SmokingPage() {
  const [target, setTarget] = useState(
    localStorage.getItem("smokingTarget") || "",
  );

  const [showTargetInput, setShowTargetInput] = useState(false);

  const [todayCigarettes, setTodayCigarettes] = useState("");

  const [mood, setMood] = useState("");

  const [craving, setCraving] = useState("");

  const [history, setHistory] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("smokingHistory")) || [];

    setHistory(savedHistory);
  }, []);

  // Save target
  const saveTarget = () => {
    if (!target) {
      alert("Enter target");
      return;
    }

    localStorage.setItem("smokingTarget", target);

    setShowTargetInput(false);
    setMessage(`🎯 Target set: ${target} cigarettes/day`);
  };

  // Daily tracking
  const trackToday = () => {
    if (!todayCigarettes || !mood || !craving) {
      alert("Fill all fields");
      return;
    }

    const newEntry = {
      date: new Date().toLocaleDateString(),
      cigarettes: Number(todayCigarettes),
      mood,
      craving,
    };

    const updatedHistory = [...history, newEntry];

    setHistory(updatedHistory);

    localStorage.setItem("smokingHistory", JSON.stringify(updatedHistory));

    // Achievement logic
    if (Number(todayCigarettes) === 0) {
      setMessage("🏆 Smoke-Free Day Achievement!");
    } else if (Number(todayCigarettes) <= Number(target)) {
      setMessage("🎯 Target Achieved!");
    } else {
      setMessage("Keep trying tomorrow 💪");
    }

    setTodayCigarettes("");
    setMood("");
    setCraving("");
  };

  // Analytics
  const totalCigs = history.reduce((sum, item) => sum + item.cigarettes, 0);

  const average =
    history.length > 0 ? (totalCigs / history.length).toFixed(1) : 0;

  // Emergency help
  const emergencyHelp = () => {
    alert("Take deep breaths, drink water, go for a walk.");
  };

  return (
    <div className="category-page">
      <h2>🚬 Smoking Recovery Hub</h2>

      {/* Target Section */}
      <div className="card">
        <h3>🎯 Weekly Target</h3>

        <p>
          Current Target:
          {target ? `${target} cigarettes/day` : " Not Set"}
        </p>

        {showTargetInput ? (
          <>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Set target"
            />

            <button onClick={saveTarget}>Save Target</button>
          </>
        ) : (
          <button onClick={() => setShowTargetInput(true)}>
            Start Challenge
          </button>
        )}
      </div>

      {/* Daily Tracking */}
      <div className="card">
        <h3>📊 Daily Tracking</h3>

        <input
          type="number"
          placeholder="Today's cigarettes"
          value={todayCigarettes}
          onChange={(e) => setTodayCigarettes(e.target.value)}
        />

        <input
          type="number"
          placeholder="Mood (1-10)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <input
          type="number"
          placeholder="Craving (1-10)"
          value={craving}
          onChange={(e) => setCraving(e.target.value)}
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
          Average Cigarettes/Day:
          {average}
        </p>
      </div>

      {/* History */}
      <div className="card">
        <h3>📅 History</h3>

        {history.map((item, index) => (
          <div key={index}>
            {item.date} —{item.cigarettes}
            cigarettes | Mood:
            {item.mood} | Craving:
            {item.craving}
          </div>
        ))}
      </div>

      {/* Emergency */}
      <div className="card actions">
        <button onClick={emergencyHelp}>🚨 Emergency Help</button>
      </div>

      {/* Result */}
      {message && (
        <div className="card">
          <h3>Status</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default SmokingPage;
