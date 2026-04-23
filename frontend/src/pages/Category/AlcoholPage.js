import React, { useState } from "react";
import "../../styles/CategoryPage.css";

function AlcoholPage() {
  const [target, setTarget] = useState("");
  const [todayDrinks, setTodayDrinks] = useState("");

  const savedTarget = Number(localStorage.getItem("alcoholTarget"));
  const history = JSON.parse(localStorage.getItem("alcoholHistory")) || [];

  const saveTarget = () => {
    const value = Number(target);

    if (!value || value <= 0 || value > 30) {
      alert("Target must be 1-30 drinks");
      return;
    }

    localStorage.setItem("alcoholTarget", value);
    alert("Target saved!");
    setTarget("");
  };

  const trackToday = () => {
    const value = Number(todayDrinks);

    if (!savedTarget) {
      alert("Set target first");
      return;
    }

    if (value < 0 || value > 30) {
      alert("Drinks must be 0-30");
      return;
    }

    const updated = [...history];
    updated.push({
      date: new Date().toLocaleDateString(),
      drinks: value,
    });

    localStorage.setItem("alcoholHistory", JSON.stringify(updated));

    alert("Tracked!");
    setTodayDrinks("");
  };

  const avg =
    history.length > 0
      ? (history.reduce((a, b) => a + b.drinks, 0) / history.length).toFixed(1)
      : 0;

  const streak = history.filter((h) => h.drinks <= savedTarget).length;

  return (
    <div className="category-page">
      <h2>🍺 Alcohol Recovery</h2>

      <div className="card">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button onClick={saveTarget}>Save Target</button>
      </div>

      <div className="card">
        <input
          type="number"
          value={todayDrinks}
          onChange={(e) => setTodayDrinks(e.target.value)}
        />
        <button onClick={trackToday}>Track Today</button>
      </div>

      <div className="card">
        <p>Average Drinks: {avg}</p>
        <p>Success Streak: {streak}</p>
      </div>
    </div>
  );
}

export default AlcoholPage;
