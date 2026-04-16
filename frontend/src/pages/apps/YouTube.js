import "../../styles/appScreens.css";

function YouTube() {
  return (
    <div className="yt-container">
      {/* TOP NAV */}
      <div className="yt-navbar">
        <h2>▶️ YouTube</h2>
        <input placeholder="Search..." />
      </div>

      <div className="yt-body">
        {/* SIDEBAR */}
        <div className="yt-sidebar">
          <p>🏠 Home</p>
          <p>🎬 Shorts</p>
          <p>📺 Subscriptions</p>
          <p>📚 Library</p>
        </div>

        {/* VIDEOS */}
        <div className="yt-content">
          <div className="yt-video">
            <div className="yt-thumb"></div>
            <p>How to stay focused 🔥</p>
          </div>

          <div className="yt-video">
            <div className="yt-thumb"></div>
            <p>Motivation video 💪</p>
          </div>

          <div className="yt-video">
            <div className="yt-thumb"></div>
            <p>Study routine 📚</p>
          </div>

          <div className="yt-video">
            <div className="yt-thumb"></div>
            <p>Top habits for success 🚀</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTube;
