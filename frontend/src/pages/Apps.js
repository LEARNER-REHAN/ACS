import "../styles/apps.css";
import { useNavigate } from "react-router-dom";

function Apps() {
  const navigate = useNavigate();

  const handleOpenApp = (appName, route) => {
    const risk = localStorage.getItem("riskLevel");

    // 🟢 LOW → OPEN
    if (risk?.includes("Low")) {
      navigate(route);
      return;
    }

    // 🟡 MEDIUM → WARNING
    if (risk?.includes("Medium")) {
      const confirmOpen = window.confirm(
        `⚠️ You are at MEDIUM risk.\nOpen ${appName}?`,
      );

      if (confirmOpen) {
        navigate(route);
      }
      return;
    }

    // 🔴 HIGH → BLOCK
    if (risk?.includes("High")) {
      alert(
        `🚫 High Risk!\n${appName} is blocked.\n\nTry meditation or take a break.`,
      );
      return;
    }

    // ❗ No data
    alert("Please complete Daily Check-In first!");
  };

  return (
    <div className="apps-container">
      <h2>📱 Simulated Apps</h2>

      <div className="apps-grid">
        <div
          className="app-card"
          onClick={() => handleOpenApp("Instagram", "/instagram")}
        >
          📸 Instagram
        </div>

        <div
          className="app-card"
          onClick={() => handleOpenApp("YouTube", "/youtube")}
        >
          ▶️ YouTube
        </div>

        <div
          className="app-card"
          onClick={() => handleOpenApp("WhatsApp", "/whatsapp")}
        >
          💬 WhatsApp
        </div>

        <div
          className="app-card"
          onClick={() => handleOpenApp("Games", "/games")}
        >
          🎮 Games
        </div>
      </div>
    </div>
  );
}

export default Apps;
