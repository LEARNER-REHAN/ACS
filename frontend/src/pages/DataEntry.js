import React, { useState } from "react";
import "../styles/dataEntry.css";

function DataEntry({ onAnalyze }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    {
      name: "Gaming",
      icon: "🎮",
      desc: "Monitor gaming usage time",
    },
    {
      name: "Social Media",
      icon: "📱",
      desc: "Track social media addiction",
    },
    {
      name: "Streaming",
      icon: "📺",
      desc: "Monitor binge watching habits",
    },
    {
      name: "Smoking",
      icon: "🚬",
      desc: "Track cigarettes, cravings & recovery",
    },
    {
      name: "Alcohol",
      icon: "🍺",
      desc: "Track alcohol consumption",
    },
  ];

  const handleContinue = () => {
    if (!selectedCategory) {
      alert("Please select an addiction category");
      return;
    }

    onAnalyze({
      category: selectedCategory,
      usage: 2,
      craving: 2,
      mood: 8,
    });
  };

  return (
    <div className="entry-page">
      <div className="entry-card">
        <h1>🧠 Choose Your Addiction Type</h1>

        <div className="category-grid">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`category-box ${
                selectedCategory === item.name ? "active-category" : ""
              }`}
              onClick={() => setSelectedCategory(item.name)}
            >
              <h2>{item.icon}</h2>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default DataEntry;
