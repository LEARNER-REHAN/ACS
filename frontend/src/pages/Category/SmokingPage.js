import React, { useState } from "react";
import "../../styles/CategoryPage.css";

function SmokingPage() {
  const [target, setTarget] = useState("");
  const [todayCigarettes, setTodayCigarettes] = useState("");

  const savedTarget = Number(localStorage.getItem("smokingTarget"));

  const history = JSON.parse(localStorage.getItem("smokingHistory")) || [];

  const latestRecord = history.length > 0 ? history[history.length - 1] : null;

  // Save Target
  const saveTarget = () => {
    const value = Number(target);

    if (!value || value <= 0 || value > 100) {
      alert("Target must be between 1-100 cigarettes");
      return;
    }

    localStorage.setItem("smokingTarget", value);

    alert("Target saved successfully!");
    setTarget("");
  };

  // Track Today
  const trackToday = () => {
    const value = Number(todayCigarettes);

    if (!savedTarget) {
      alert("Please set target first");
      return;
    }

    if (value < 0 || value > 100) {
      alert("Daily cigarettes must be between 0-100");
      return;
    }

    const updatedHistory = [...history];

    updatedHistory.push({
      date: new Date().toLocaleDateString(),
      cigarettes: value,
    });

    localStorage.setItem("smokingHistory", JSON.stringify(updatedHistory));

    alert("Progress tracked successfully!");

    setTodayCigarettes("");
  };

  // Reset Data
  const resetData = () => {
    localStorage.removeItem("smokingHistory");
    localStorage.removeItem("smokingTarget");

    alert("All smoking data cleared!");

    setTarget("");
    setTodayCigarettes("");
  };

  // Emergency Help
  const emergencyHelp = () => {
    alert(
      "🚨 Emergency Help:\n\n" +
        "• Drink water\n" +
        "• Chew gum\n" +
        "• Go for a walk\n" +
        "• Call a friend\n" +
        "• Avoid smoking triggers",
    );
  };

  // Progress Calculation
  let progress = 0;
  let status = "No Data";

  if (latestRecord && savedTarget) {
    progress = Math.max(
      0,
      (((savedTarget - latestRecord.cigarettes) / savedTarget) * 100).toFixed(
        1,
      ),
    );

    if (latestRecord.cigarettes <= savedTarget) {
      status = "✅ Good";
    } else if (latestRecord.cigarettes <= savedTarget + 5) {
      status = "⚠ Warning";
    } else {
      status = "🚨 Critical";
    }
  }

  return (
    <div className="category-page">
      <h2>🚬 Smoking Recovery</h2>

      {/* Set Target */}
      <div className="card">
        <h3>🎯 Set Daily Target</h3>

        <input
          type="number"
          placeholder="Target cigarettes/day"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <button onClick={saveTarget}>Save Target</button>
      </div>

      {/* Track Today */}
      <div className="card">
        <h3>📊 Track Today</h3>

        <input
          type="number"
          placeholder="Today's cigarettes"
          value={todayCigarettes}
          onChange={(e) => setTodayCigarettes(e.target.value)}
        />

        <button onClick={trackToday}>Track Today</button>
      </div>

      {/* Analytics */}
      <div className="card">
        <h3>📈 Analytics</h3>

        <p>Current Target: {savedTarget || "Not Set"}</p>

        <p>
          Latest Usage: {latestRecord ? latestRecord.cigarettes : "No Data"}
        </p>

        <p>Progress: {progress}%</p>

        <p>Status: {status}</p>
      </div>

      {/* History */}
      <div className="card">
        <h3>📅 Recent History</h3>

        {history.length === 0 ? (
          <p>No history found</p>
        ) : (
          history
            .slice(-5)
            .reverse()
            .map((item, index) => (
              <p key={index}>
                {item.date} → {item.cigarettes} cigarettes
              </p>
            ))
        )}
      </div>

      {/* Actions */}
      <div className="card actions">
        <button onClick={emergencyHelp}>🚨 Emergency Help</button>

        <button className="secondary" onClick={resetData}>
          Reset Data
        </button>
      </div>
    </div>
  );
}

export default SmokingPage;
