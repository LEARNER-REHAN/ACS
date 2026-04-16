import React, { useState } from "react";
import "../styles/dataEntry.css";

function DataEntry({ onAnalyze }) {
  const [formData, setFormData] = useState({
    category: "",
    usage: "",
    craving: "",
    mood: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select addiction category");
      return;
    }

    onAnalyze(formData);

    // Reset form
    setFormData({
      category: "",
      usage: "",
      craving: "",
      mood: "",
    });
  };

  // Dynamic label based on category
  const getUsageLabel = () => {
    switch (formData.category) {
      case "Social Media":
        return "⏱ Hours spent on social media today";
      case "Gaming":
        return "🎮 Hours spent gaming today";
      case "Streaming":
        return "📺 Hours spent watching content";
      case "Smoking":
        return "🚬 Number of cigarettes smoked";
      case "Alcohol":
        return "🍺 Number of drinks taken";
      default:
        return "Enter usage";
    }
  };

  return (
    <div className="data-entry">
      <h2>🧠 Daily Check-In</h2>

      <form onSubmit={handleSubmit}>
        {/* CATEGORY */}
        <div className="form-group">
          <label>Select Addiction Type</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="Social Media">📱 Social Media</option>
            <option value="Gaming">🎮 Gaming</option>
            <option value="Streaming">📺 Streaming</option>
            <option value="Smoking">🚬 Smoking</option>
            <option value="Alcohol">🍺 Alcohol</option>
          </select>
        </div>

        {/* DYNAMIC FIELDS */}
        {formData.category && (
          <>
            <div className="form-group">
              <label>{getUsageLabel()}</label>
              <input
                type="number"
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>🔥 How strong was your urge? (1-10)</label>
              <input
                type="number"
                name="craving"
                value={formData.craving}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>

            <div className="form-group">
              <label>😊 How was your mood today? (1-10)</label>
              <input
                type="number"
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>
          </>
        )}

        <button type="submit">Analyze</button>
      </form>
    </div>
  );
}

export default DataEntry;
