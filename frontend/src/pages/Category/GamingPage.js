import React from "react";
import "../../styles/CategoryPage.css";

function GamingPage() {
  return (
    <div className="category-page">
      <h2>🎮 Gaming Control</h2>

      <div className="card">
        <h3>📊 Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: "50%" }}></div>
        </div>
      </div>

      <div className="card">
        <h3>🎯 Tips</h3>
        <div className="tips">
          <div className="tip">⏱ Set limits</div>
          <div className="tip">⚽ Go outside</div>
          <div className="tip">🌙 No late gaming</div>
          <div className="tip">🧘 Take breaks</div>
        </div>
      </div>

      <div className="card actions">
        <button>Start Challenge</button>
        <button className="secondary">Track</button>
      </div>
    </div>
  );
}

export default GamingPage;
