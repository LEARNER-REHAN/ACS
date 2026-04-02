import { useState } from "react";
import "../styles/dataEntry.css";

function DataEntry({ onAnalyze }) {
  const [data, setData] = useState({
    usage: "",
    craving: "",
    mood: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="checkin-container">
      <h2>🧠 Daily Check-In</h2>

      <div className="form-box">
        <input
          name="usage"
          placeholder="Usage (0-10)"
          onChange={handleChange}
        />
        <input
          name="craving"
          placeholder="Craving (0-10)"
          onChange={handleChange}
        />
        <input name="mood" placeholder="Mood (0-10)" onChange={handleChange} />

        <button onClick={() => onAnalyze(data)}>Analyze</button>
      </div>
    </div>
  );
}

export default DataEntry;
