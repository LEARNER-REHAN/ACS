import React, { useState } from "react";
import "../styles/dataEntry.css";

function DataEntry({ onAnalyze }) {
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      alert("Please select addiction type");
      return;
    }

    onAnalyze({ category });
  };

  return (
    <div className="data-entry">
      <h2>🧠 Choose Your Addiction Type</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Addiction Type</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select --</option>

            <option value="Smoking">🚬 Smoking</option>

            <option value="Gaming">🎮 Gaming</option>

            <option value="Social Media">📱 Social Media</option>

            <option value="Streaming">📺 Streaming</option>

            <option value="Alcohol">🍺 Alcohol</option>
          </select>
        </div>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default DataEntry;
