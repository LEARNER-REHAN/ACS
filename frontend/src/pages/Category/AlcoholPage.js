import React from "react";
import "../../styles/CategoryPage.css";

function AlcoholPage() {
  return (
    <div className="category-page">
      <h2>🍺 Alcohol Control</h2>

      <div className="card">
        <h3>📊 Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: "40%" }}></div>
        </div>
      </div>

      <div className="card">
        <h3>🎯 Tips</h3>
        <div className="tips">
          <div className="tip">🚫 Reduce intake</div>
          <div className="tip">💧 Stay hydrated</div>
          <div className="tip">👥 Avoid pressure</div>
          <div className="tip">🧠 Stay mindful</div>
        </div>
      </div>

      <div className="card actions">
        <button>Start Challenge</button>
        <button className="secondary">Track</button>
      </div>
    </div>
  );
}

export default AlcoholPage;
