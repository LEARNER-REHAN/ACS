import React, { useEffect, useState } from "react";
import "../../styles/StreamingPage.css";

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
    const fetchStreamingData = () => {
      const data = JSON.parse(localStorage.getItem("streamingUsageData")) || {
        netflix: 0,
        prime: 0,
        hotstar: 0,
        twitch: 0,
      };

      setStreamData(data);
    };

    // initial fetch
    fetchStreamingData();

    // update every second
    const interval = setInterval(() => {
      fetchStreamingData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const total =
    streamData.netflix +
    streamData.prime +
    streamData.hotstar +
    streamData.twitch;

  return (
    <div className="streaming-page">
      <h1>📺 Streaming Recovery</h1>

      <div className="streaming-card">
        <h2>Live Streaming Usage</h2>

        <p>🎬 Netflix: {formatTime(streamData.netflix)}</p>
        <p>📦 Prime Video: {formatTime(streamData.prime)}</p>
        <p>⭐ Hotstar: {formatTime(streamData.hotstar)}</p>
        <p>🎮 Twitch: {formatTime(streamData.twitch)}</p>

        <h3>Total Today: {formatTime(total)}</h3>

        <div className="status-box">
          ✅ Real-time streaming tracking working
        </div>
      </div>
    </div>
  );
}

export default StreamingPage;
