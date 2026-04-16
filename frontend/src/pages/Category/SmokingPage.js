import React from "react";
import "../../styles/CategoryPage.css";

function SmokingPage() {
  return (
    <div className="category-page">
      <h2>🚬 Smoking Control</h2>

      {/* Progress Card */}
      <div className="card progress-card">
        <h3>📊 Your Progress</h3>
        <p>You're improving! Keep reducing gradually.</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: "60%" }}></div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="card">
        <h3>🎯 Tips to Reduce Smoking</h3>

        <div className="tips">
          <div className="tip">🚭 Reduce cigarettes daily</div>
          <div className="tip">🧠 Avoid stress triggers</div>
          <div className="tip">💧 Drink more water</div>
          <div className="tip">🏃 Stay active</div>
        </div>
      </div>

      {/* Actions */}
      <div className="card actions">
        <button>Start 7-Day Challenge</button>
        <button className="secondary">Track Progress</button>
      </div>
    </div>
  );
}

export default SmokingPage;
