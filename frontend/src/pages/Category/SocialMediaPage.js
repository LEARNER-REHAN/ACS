import React, { useEffect, useState } from "react";
import "../../styles/SocialMediaPage.css";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function SocialMediaPage() {
  const [usageData, setUsageData] = useState({
    youtube: 0,
    instagram: 0,
    facebook: 0,
    twitter: 0,
  });

  // Convert seconds → real-time format
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }

    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }

    return `${secs}s`;
  };

  useEffect(() => {
    const fetchUsageData = () => {
      const data = JSON.parse(localStorage.getItem("socialUsageData")) || {
        youtube: 0,
        instagram: 0,
        facebook: 0,
        twitter: 0,
      };

      setUsageData(data);
    };

    // Initial fetch
    fetchUsageData();

    // Update every second
    const interval = setInterval(() => {
      fetchUsageData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalSeconds =
    usageData.youtube +
    usageData.instagram +
    usageData.facebook +
    usageData.twitter;

  // Chart data
  const chartData = [
    {
      name: "YouTube",
      value: usageData.youtube,
    },
    {
      name: "Instagram",
      value: usageData.instagram,
    },
    {
      name: "Facebook",
      value: usageData.facebook,
    },
    {
      name: "Twitter",
      value: usageData.twitter,
    },
  ];

  const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#8b5cf6"];

  return (
    <div className="social-page">
      <h1>📱 Social Media Analytics</h1>

      {/* Top Stats */}
      <div className="top-stats">
        <div className="stat-card">
          <h4>Total Time Today</h4>
          <h2>{formatTime(totalSeconds)}</h2>
        </div>

        <div className="stat-card">
          <h4>Most Used Platform</h4>
          <h2>YouTube</h2>
        </div>

        <div className="stat-card">
          <h4>Productivity Score</h4>
          <h2>82%</h2>
        </div>
      </div>

      {/* Middle */}
      <div className="middle-grid">
        <div className="live-card">
          <h2>Live Usage Tracking</h2>

          <div className="platform-row">
            <span className="platform-name">📺 YouTube</span>
            <span className="platform-time">
              {formatTime(usageData.youtube)}
            </span>
          </div>

          <div className="platform-row">
            <span className="platform-name">📸 Instagram</span>
            <span className="platform-time">
              {formatTime(usageData.instagram)}
            </span>
          </div>

          <div className="platform-row">
            <span className="platform-name">📘 Facebook</span>
            <span className="platform-time">
              {formatTime(usageData.facebook)}
            </span>
          </div>

          <div className="platform-row">
            <span className="platform-name">🐦 Twitter/X</span>
            <span className="platform-time">
              {formatTime(usageData.twitter)}
            </span>
          </div>
        </div>

        <div className="chart-card">
          <h2>Usage Breakdown</h2>

          <PieChart width={300} height={300}>
            <Pie data={chartData} dataKey="value" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Insight */}
      <div className="insight-card">
        <h2>Daily Insight</h2>
        <p>
          Your Instagram usage increased by 18% today. Consider taking a short
          break after 30 minutes of scrolling.
        </p>
      </div>
    </div>
  );
}

export default SocialMediaPage;
