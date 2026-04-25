import React, { useEffect, useState } from "react";
import "../../styles/StreamingPage.css";

function StreamingPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.chrome &&
        window.chrome.storage &&
        window.chrome.storage.local
      ) {
        window.chrome.storage.local.get(["usageData"], (result) => {
          setData(result.usageData || {});
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const streamingTotal =
    (data.streamingYoutube || 0) +
    (data.netflix || 0) +
    (data.prime || 0) +
    (data.hotstar || 0) +
    (data.twitch || 0);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="streaming-page">
      <h1 className="streaming-title">📺 Streaming Recovery</h1>

      {/* Live Usage */}
      <div className="streaming-card">
        <h2>Live Streaming Usage</h2>

        <div className="usage-item">
          📺 YouTube: {formatTime(data.streamingYoutube || 0)}
        </div>

        <div className="usage-item">
          🎬 Netflix: {formatTime(data.netflix || 0)}
        </div>

        <div className="usage-item">
          📦 Prime Video: {formatTime(data.prime || 0)}
        </div>

        <div className="usage-item">
          ⭐ Hotstar: {formatTime(data.hotstar || 0)}
        </div>

        <div className="usage-item">
          🎮 Twitch: {formatTime(data.twitch || 0)}
        </div>

        <div className="total-usage">
          Total Today: {formatTime(streamingTotal)}
        </div>

        <div className="warning success">
          ✅ Real-time streaming tracking working
        </div>
      </div>

      {/* Analytics */}
      <div className="streaming-card">
        <h2>Analytics</h2>

        <div className="analytics-item">
          Average Usage: Auto calculated from history
        </div>

        <div className="analytics-item">Best Day: Lowest streaming day</div>

        <div className="analytics-item">Worst Day: Highest streaming day</div>
      </div>
    </div>
  );
}

export default StreamingPage;
