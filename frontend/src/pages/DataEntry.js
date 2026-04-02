import { useState } from "react";
import "../styles/dataEntry.css";

function DataEntry() {
  const [data, setData] = useState({
    usage: "",
    craving: "",
    mood: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const analyzeData = () => {
    const usage = Number(data.usage);
    const craving = Number(data.craving);
    const mood = Number(data.mood);

    let risk = "Low 🟢";
    let suggestion = "Keep going 👍";

    if (usage > 5 || craving > 7) {
      risk = "High 🔴";
      suggestion = "Take a break, go outside, avoid triggers.";
    } else if (usage > 3 || craving > 4) {
      risk = "Medium 🟡";
      suggestion = "Try meditation or reduce screen time.";
    }

    if (mood < 4) {
      suggestion += " Talk to a friend ❤️";
    }

    setResult({ risk, suggestion });

    // ✅ ===== STREAK LOGIC =====
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    let streak = Number(localStorage.getItem("streak")) || 0;

    if (!lastCheckIn) {
      streak = 1;
    } else {
      const lastDate = new Date(lastCheckIn);
      const diffDays = Math.floor(
        (new Date(today) - lastDate) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 0) {
        // already checked today
      } else if (diffDays === 1) {
        streak += 1;
      } else {
        streak = 1;
      }
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCheckIn", today);
  };

  return (
    <div className="checkin-container">
      <h2>🧠 Daily Check-In</h2>

      <div className="form-box">
        <input
          name="usage"
          placeholder="Usage hours (e.g. 5)"
          onChange={handleChange}
        />

        <input
          name="craving"
          placeholder="Craving level (1-10)"
          onChange={handleChange}
        />

        <input name="mood" placeholder="Mood (1-10)" onChange={handleChange} />

        <button onClick={analyzeData}>Analyze</button>
      </div>

      {/* ✅ RESULT SHOWN HERE */}
      {result && (
        <div className="result-box">
          <h3>📊 Your Result</h3>
          <p>
            Risk Level: <b>{result.risk}</b>
          </p>
          <p>Recommendation: {result.suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default DataEntry;
