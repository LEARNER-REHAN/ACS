import React from "react";
import "../../styles/CategoryPage.css";

function StreamingPage() {
  return (
    <div className="category-page">
      <h2>📺 Streaming Control</h2>

      <div className="card">
        <h3>📊 Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: "45%" }}></div>
        </div>
      </div>

      <div className="card">
        <h3>🎯 Tips</h3>
        <div className="tips">
          <div className="tip">⏱ Limit watch time</div>
          <div className="tip">❌ Avoid binge</div>
          <div className="tip">🌙 Sleep early</div>
          <div className="tip">📖 Do other tasks</div>
        </div>
      </div>

      <div className="card actions">
        <button>Start Challenge</button>
        <button className="secondary">Track</button>
      </div>
    </div>
  );
}

export default StreamingPage;
