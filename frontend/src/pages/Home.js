import { useEffect, useState } from "react";
import "../styles/dashboard.css";

function Home() {
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);
  const [improvement, setImprovement] = useState(0);

  useEffect(() => {
    const updateData = () => {
      setStreak(Number(localStorage.getItem("streak")) || 0);
      setProgress(Number(localStorage.getItem("overallProgress")) || 0);
      setImprovement(Number(localStorage.getItem("improvement")) || 0);
    };

    updateData();
    window.addEventListener("focus", updateData);

    return () => window.removeEventListener("focus", updateData);
  }, []);

  return (
    <div>
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="card-grid">
        <div className="card">
          <h4>Current Streak</h4>
          <p>{streak} Days</p>
        </div>

        <div className="card">
          <h4>Recovery Progress</h4>
          <p>{progress}%</p>
        </div>

        <div className="card">
          <h4>Weekly Improvement</h4>
          <p style={{ color: improvement > 0 ? "green" : "red" }}>
            {improvement > 0 ? "+" : ""}
            {improvement}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
