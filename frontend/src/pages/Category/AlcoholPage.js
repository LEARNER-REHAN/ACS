import React, { useState, useEffect } from "react";
import "../../styles/CategoryPage.css";

function AlcoholPage() {
  const [target, setTarget] = useState(
    localStorage.getItem("alcoholTarget") || "",
  );

  const [drinksToday, setDrinksToday] = useState("");
  const [mood, setMood] = useState("");
  const [urge, setUrge] = useState("");
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("alcoholHistory")) || [];

    setHistory(saved);
  }, []);

  const saveTarget = () => {
    if (!target) {
      alert("Enter target drinks/week");
      return;
    }

    localStorage.setItem("alcoholTarget", target);

    setMessage(`🎯 Target set: ${target} drinks/week`);
  };

  const trackToday = () => {
    if (!drinksToday || !mood || !urge) {
      alert("Fill all fields");
      return;
    }

    const entry = {
      date: new Date().toLocaleDateString(),
      drinks: Number(drinksToday),
      mood,
      urge,
    };

    const updated = [...history, entry];

    setHistory(updated);

    localStorage.setItem("alcoholHistory", JSON.stringify(updated));

    if (Number(drinksToday) === 0) {
      setMessage("🏆 Alcohol-Free Day!");
    } else if (Number(drinksToday) <= Number(target)) {
      setMessage("🎉 Target achieved!");
    } else {
      setMessage("Try reducing alcohol tomorrow 💪");
    }

    setDrinksToday("");
    setMood("");
    setUrge("");
  };

  const totalDrinks = history.reduce((sum, item) => sum + item.drinks, 0);

  const average =
    history.length > 0 ? (totalDrinks / history.length).toFixed(1) : 0;

  const emergencyHelp = () => {
    alert("Drink water, call a friend, avoid parties/triggers.");
  };

  return (
    <div className="category-page">
      <h2>🍺 Alcohol Recovery</h2>

      {/* Target */}
      <div className="card">
        <h3>🎯 Set Target</h3>

        <input
          type="number"
          placeholder="Target drinks/week"
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
          placeholder="Today's drinks"
          value={drinksToday}
          onChange={(e) => setDrinksToday(e.target.value)}
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
          Average Drinks:
          {average}
        </p>
      </div>

      {/* History */}
      <div className="card">
        <h3>📅 History</h3>

        {history.map((item, index) => (
          <div key={index}>
            {item.date} —{item.drinks}
            drinks | Mood:
            {item.mood}| Urge:
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

export default AlcoholPage;
