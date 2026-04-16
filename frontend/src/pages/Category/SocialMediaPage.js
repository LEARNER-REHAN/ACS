import React from "react";
import "../../styles/CategoryPage.css";

function SocialMediaPage() {
  return (
    <div className="category-page">
      <h2>📱 Social Media Control</h2>

      <div className="card">
        <h3>📊 Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: "55%" }}></div>
        </div>
      </div>

      <div className="card">
        <h3>🎯 Tips</h3>
        <div className="tips">
          <div className="tip">📵 Limit usage</div>
          <div className="tip">🔕 Disable alerts</div>
          <div className="tip">🌙 No late scroll</div>
          <div className="tip">📚 Focus work</div>
        </div>
      </div>

      <div className="card actions">
        <button>Start Challenge</button>
        <button className="secondary">Track</button>
      </div>
    </div>
  );
}

export default SocialMediaPage;
