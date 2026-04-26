import React, { useEffect, useState } from "react";
import "../../styles/GamingPage.css";

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

    const interval = setInterval(() => {
      fetchGamingData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const total =
    gamingData.roblox +
    gamingData.chess +
    gamingData.poki +
    gamingData.crazygames +
    gamingData.miniclip +
    gamingData.steam;

  return (
    <div className="gaming-page">
      <h1>🎮 Gaming Tracker</h1>

      <div className="gaming-card">
        <h2>Live Gaming Usage</h2>

        <p>🎲 Roblox: {formatTime(gamingData.roblox)}</p>
        <p>♟ Chess.com: {formatTime(gamingData.chess)}</p>
        <p>🕹 Poki: {formatTime(gamingData.poki)}</p>
        <p>🔥 CrazyGames: {formatTime(gamingData.crazygames)}</p>
        <p>🎯 Miniclip: {formatTime(gamingData.miniclip)}</p>
        <p>🎮 Steam: {formatTime(gamingData.steam)}</p>

        <h3>Total Today: {formatTime(total)}</h3>

        <div className="status-box">✅ Real-time gaming tracking working</div>
      </div>
    </div>
  );
}

export default GamingPage;
