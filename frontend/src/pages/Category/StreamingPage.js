import React, { useEffect, useState } from "react";
import "../../styles/StreamingPage.css";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function StreamingPage() {
  const [streamData, setStreamData] = useState({
    netflix: 0,
    prime: 0,
    hotstar: 0,
    twitch: 0,
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
    const fetchData = () => {
      const data = JSON.parse(localStorage.getItem("streamingUsageData")) || {
        netflix: 0,
        prime: 0,
        hotstar: 0,
        twitch: 0,
      };

      setStreamData(data);
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const total =
    streamData.netflix +
    streamData.prime +
    streamData.hotstar +
    streamData.twitch;

  const chartData = [
    { name: "Netflix", value: streamData.netflix },
    { name: "Prime", value: streamData.prime },
    { name: "Hotstar", value: streamData.hotstar },
    { name: "Twitch", value: streamData.twitch },
  ];

  const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#8b5cf6"];

  const mostUsed = chartData.reduce((max, item) =>
    item.value > max.value ? item : max,
  ).name;

  return (
    <div className="streaming-page">
      <h1>📺 Streaming Analytics</h1>

      {/* Top Stats */}
      <div className="top-stats">
        <div className="stat-card">
          <h4>Total Watch Time</h4>
          <h2>{formatTime(total)}</h2>
        </div>

        <div className="stat-card">
          <h4>Most Used Platform</h4>
          <h2>{mostUsed}</h2>
        </div>

        <div className="stat-card">
          <h4>Screen Balance Score</h4>
          <h2>{total > 7200 ? "45%" : "85%"}</h2>
        </div>
      </div>

      {/* Middle Layout */}
      <div className="middle-grid">
        {/* Live Tracking */}
        <div className="live-card">
          <h2>Live Streaming Usage</h2>

          <div className="platform-row">
            <span className="platform-name">🎬 Netflix</span>
            <span className="platform-time">
              {formatTime(streamData.netflix)}
            </span>
          </div>

          <div className="platform-row">
            <span className="platform-name">📦 Prime Video</span>
            <span className="platform-time">
              {formatTime(streamData.prime)}
            </span>
          </div>

          <div className="platform-row">
            <span className="platform-name">⭐ Hotstar</span>
            <span className="platform-time">
              {formatTime(streamData.hotstar)}
            </span>
          </div>

          <div className="platform-row">
            <span className="platform-name">🎮 Twitch</span>
            <span className="platform-time">
              {formatTime(streamData.twitch)}
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="chart-card">
          <h2>Usage Breakdown</h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={90} label>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight Section */}
      <div className="insight-card">
        <h2>Daily Insight</h2>

        <p>
          {total > 10800
            ? "⚠ High streaming usage detected today. Consider reducing binge watching."
            : "✅ Healthy streaming habits maintained today."}
        </p>
      </div>
    </div>
  );
}

export default StreamingPage;
