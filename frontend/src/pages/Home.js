import { useEffect, useState } from "react";
import "../styles/dashboard.css";

function Home() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const updateStreak = () => {
      const stored = localStorage.getItem("streak") || 0;
      setStreak(stored);
    };

    updateStreak();

    // 🔥 Auto update when user returns
    window.addEventListener("focus", updateStreak);

    return () => window.removeEventListener("focus", updateStreak);
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
          <p>65%</p>
        </div>

        <div className="card">
          <h4>Weekly Improvement</h4>
          <p>+12%</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
