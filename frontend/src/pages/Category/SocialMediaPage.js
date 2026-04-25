import React, { useEffect, useState } from "react";
import "../../styles/SocialMediaPage.css";

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

    // Update every second for real-time feel
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

  return (
    <div className="social-page">
      <h1>📱 Automatic Social Media Tracker</h1>

      <div className="social-card">
        <h2>Live Browser Tracking</h2>

        <h3>Total Usage Today: {formatTime(totalSeconds)}</h3>

        <div className="platform-stats">
          <p>📺 YouTube: {formatTime(usageData.youtube)}</p>
          <p>📸 Instagram: {formatTime(usageData.instagram)}</p>
          <p>📘 Facebook: {formatTime(usageData.facebook)}</p>
          <p>🐦 Twitter/X: {formatTime(usageData.twitter)}</p>
        </div>

        <div className="status-box">
          ✅ Real-time automatic tracking working
        </div>
      </div>
    </div>
  );
}

export default SocialMediaPage;
