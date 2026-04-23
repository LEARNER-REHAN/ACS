import React, { useState } from "react";
import "../../styles/CategoryPage.css";

function SocialMediaPage() {
  const [target, setTarget] = useState("");
  const [todayUsage, setTodayUsage] = useState("");
  const [mood, setMood] = useState("");
  const [urge, setUrge] = useState("");

  // Get saved target safely
  const savedTarget = Number(localStorage.getItem("socialTarget"));

  // Save Target
  const saveTarget = () => {
    if (!target) {
      alert("Please enter a target");
      return;
    }

    const targetValue = Number(target);

    if (targetValue <= 0 || targetValue > 24) {
      alert("Target must be between 1 and 24 hours");
      return;
    }

    localStorage.setItem("socialTarget", targetValue);

    alert("Target saved successfully!");

    setTarget("");
  };

  // Track Today's Usage
  const trackToday = () => {
    if (!todayUsage || !mood || !urge) {
      alert("Please fill all fields");
      return;
    }

    const usageValue = Number(todayUsage);

    const moodValue = Number(mood);

    const urgeValue = Number(urge);

    if (usageValue < 0 || usageValue > 24) {
      alert("Screen time must be between 0 and 24 hours");
      return;
    }

    if (moodValue < 1 || moodValue > 10) {
      alert("Mood must be between 1 and 10");
      return;
    }

    if (urgeValue < 1 || urgeValue > 10) {
      alert("Urge must be between 1 and 10");
      return;
    }

    if (!savedTarget || savedTarget > 24) {
      alert("Please set a valid target first");
      return;
    }

    const history = JSON.parse(localStorage.getItem("socialHistory")) || [];

    history.push({
      date: new Date().toLocaleDateString(),
      usage: usageValue,
      mood: moodValue,
      urge: urgeValue,
    });

    localStorage.setItem("socialHistory", JSON.stringify(history));

    alert("Today's progress tracked successfully!");

    setTodayUsage("");
    setMood("");
    setUrge("");
  };

  // Emergency Help
  const emergencyHelp = () => {
    alert(
      "🚨 Emergency Tips:\n\n" +
        "• Turn off notifications\n" +
        "• Keep phone away\n" +
        "• Go outside\n" +
        "• Talk to friends/family\n" +
        "• Read a book",
    );
  };

  return (
    <div className="category-page">
      <h2>📱 Social Media Recovery</h2>

      {/* Target Section */}
      <div className="card">
        <h3>🎯 Set Target</h3>

        <input
          type="number"
          placeholder="Target hrs/day"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <button onClick={saveTarget}>Save Target</button>
      </div>

      {/* Track Section */}
      <div className="card">
        <h3>📊 Track Today</h3>

        <input
          type="number"
          placeholder="Today's screen time"
          value={todayUsage}
          onChange={(e) => setTodayUsage(e.target.value)}
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

      {/* Emergency Help */}
      <div className="card">
        <button onClick={emergencyHelp}>🚨 Emergency Help</button>
      </div>

      {/* Current Target */}
      <p>
        🎯 Current Target:{" "}
        {savedTarget > 0 && savedTarget <= 24
          ? `${savedTarget} hrs/day`
          : "Not Set"}
      </p>
    </div>
  );
}

export default SocialMediaPage;
