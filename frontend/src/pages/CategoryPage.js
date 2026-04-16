import React from "react";

function CategoryPage({ category }) {
  if (!category) {
    return <h2 style={{ padding: "20px" }}>No category selected</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>📌 {category} Recovery Plan</h2>

      {category === "Smoking" && (
        <div>
          <h3>🚬 Smoking Control</h3>
          <ul>
            <li>Reduce cigarettes gradually</li>
            <li>Avoid triggers like stress</li>
            <li>Try nicotine alternatives</li>
          </ul>
        </div>
      )}

      {category === "Gaming" && (
        <div>
          <h3>🎮 Gaming Control</h3>
          <ul>
            <li>Set daily time limits</li>
            <li>Play outdoor sports</li>
            <li>Avoid late-night gaming</li>
          </ul>
        </div>
      )}

      {category === "Social Media" && (
        <div>
          <h3>📱 Social Media Control</h3>
          <ul>
            <li>Limit screen time</li>
            <li>Turn off notifications</li>
            <li>Use focus apps</li>
          </ul>
        </div>
      )}

      {category === "Alcohol" && (
        <div>
          <h3>🍺 Alcohol Control</h3>
          <ul>
            <li>Reduce intake gradually</li>
            <li>Avoid peer pressure</li>
            <li>Stay hydrated</li>
          </ul>
        </div>
      )}

      {category === "Streaming" && (
        <div>
          <h3>📺 Streaming Control</h3>
          <ul>
            <li>Avoid binge watching</li>
            <li>Set watch limits</li>
            <li>Sleep on time</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
