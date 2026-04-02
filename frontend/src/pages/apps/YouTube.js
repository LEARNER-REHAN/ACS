import "../../styles/appScreens.css";
function YouTube() {
  return (
    <div className="app-screen">
      <h2>▶️ YouTube</h2>

      <div className="video-list">
        <div className="video">
          <div className="thumbnail"></div>
          <p>How to stay focused 🔥</p>
        </div>

        <div className="video">
          <div className="thumbnail"></div>
          <p>Motivation video 💪</p>
        </div>
      </div>
    </div>
  );
}

export default YouTube;
