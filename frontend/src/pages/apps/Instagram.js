import "../../styles/appScreens.css";
function Instagram() {
  return (
    <div className="app-screen">
      <h2>📸 Instagram</h2>

      <div className="feed">
        <div className="post">
          <div className="post-header">user_123</div>
          <div className="post-img"></div>
          <div className="post-actions">❤️ 💬 🔄</div>
        </div>

        <div className="post">
          <div className="post-header">fitness_guru</div>
          <div className="post-img"></div>
          <div className="post-actions">❤️ 💬 🔄</div>
        </div>
      </div>
    </div>
  );
}

export default Instagram;
