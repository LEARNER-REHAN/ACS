import React, { useEffect, useState } from "react";
import "../../styles/GamingPage.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function GamingPage() {
  const [gamingData, setGamingData] = useState({
    roblox: 0,
    chess: 0,
    poki: 0,
    crazygames: 0,
    miniclip: 0,
    steam: 0,
  });

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  useEffect(() => {
    const fetchGamingData = () => {
      const data = JSON.parse(localStorage.getItem("gamingUsageData")) || {
        roblox: 0,
        chess: 0,
        poki: 0,
        crazygames: 0,
        miniclip: 0,
        steam: 0,
      };

      setGamingData(data);
    };

    fetchGamingData();

    const interval = setInterval(fetchGamingData, 1000);

    return () => clearInterval(interval);
  }, []);

  const total =
    gamingData.roblox +
    gamingData.chess +
    gamingData.poki +
    gamingData.crazygames +
    gamingData.miniclip +
    gamingData.steam;

  const highestPlatform = Object.keys(gamingData).reduce((a, b) =>
    gamingData[a] > gamingData[b] ? a : b,
  );

  const chartData = [
    { name: "Roblox", value: gamingData.roblox },
    { name: "Chess", value: gamingData.chess },
    { name: "Poki", value: gamingData.poki },
    { name: "CrazyGames", value: gamingData.crazygames },
    { name: "Miniclip", value: gamingData.miniclip },
    { name: "Steam", value: gamingData.steam },
  ];

  const COLORS = [
    "#4F46E5",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

  return (
    <div className="gaming-page">
      <h1>🎮 Gaming Dashboard</h1>

      {/* Top Stats */}
      <div className="gaming-stats">
        <div className="stat-card">
          <h4>Total Gaming Time</h4>
          <h2>{formatTime(total)}</h2>
        </div>

        <div className="stat-card">
          <h4>Most Used Platform</h4>
          <h2>{highestPlatform}</h2>
        </div>

        <div className="stat-card">
          <h4>Gaming Control</h4>
          <h2>{total > 7200 ? "High Risk" : "Good"}</h2>
        </div>
      </div>

      {/* Main Section */}
      <div className="gaming-main-grid">
        {/* Left Tracking Section */}
        <div className="gaming-card">
          <h2>Live Gaming Usage</h2>

          <div className="game-item">
            <span>🎲 Roblox</span>
            <span>{formatTime(gamingData.roblox)}</span>
          </div>

          <div className="game-item">
            <span>♟ Chess</span>
            <span>{formatTime(gamingData.chess)}</span>
          </div>

          <div className="game-item">
            <span>🕹 Poki</span>
            <span>{formatTime(gamingData.poki)}</span>
          </div>

          <div className="game-item">
            <span>🔥 CrazyGames</span>
            <span>{formatTime(gamingData.crazygames)}</span>
          </div>

          <div className="game-item">
            <span>🎯 Miniclip</span>
            <span>{formatTime(gamingData.miniclip)}</span>
          </div>

          <div className="game-item">
            <span>🎮 Steam</span>
            <span>{formatTime(gamingData.steam)}</span>
          </div>

          <div className="status-box">✅ Real-time gaming tracking active</div>
        </div>

        {/* Right Chart */}
        <div className="chart-box">
          <h2>Gaming Breakdown</h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Insight */}
      <div className="insight-card">
        <h2>Gaming Insight</h2>
        <p>
          {total > 7200
            ? "Your gaming time is high today. Try taking breaks every 30 minutes."
            : "Great control today! Keep maintaining healthy gaming habits."}
        </p>
      </div>
    </div>
  );
}

export default GamingPage;
