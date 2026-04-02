import "../styles/apps.css";
import { useNavigate } from "react-router-dom";

// ✅ import images
import instagramIcon from "../assets/icons/instagram.webp";
import youtubeIcon from "../assets/icons/youtube.webp";
import whatsappIcon from "../assets/icons/whatsapp.webp";
import gamesIcon from "../assets/icons/games.webp";

function Apps() {
  const navigate = useNavigate();

  const handleOpenApp = (appName, route) => {
    const risk = localStorage.getItem("riskLevel");

    if (risk?.includes("Low")) {
      navigate(route);
      return;
    }

    if (risk?.includes("Medium")) {
      const confirmOpen = window.confirm(`⚠️ Medium risk.\nOpen ${appName}?`);
      if (confirmOpen) navigate(route);
      return;
    }

    if (risk?.includes("High")) {
      alert(`🚫 ${appName} blocked due to high risk!`);
      return;
    }

    alert("Please complete Daily Check-In first!");
  };

  return (
    <div className="apps-container">
      <div className="apps-wrapper">
        <h2>📱 Apps</h2>

        <div className="apps-grid">
          <div
            className="app-icon"
            onClick={() => handleOpenApp("Instagram", "/instagram")}
          >
            <img src={instagramIcon} alt="Instagram" />
            <p>Instagram</p>
          </div>

          <div
            className="app-icon"
            onClick={() => handleOpenApp("YouTube", "/youtube")}
          >
            <img src={youtubeIcon} alt="YouTube" />
            <p>YouTube</p>
          </div>

          <div
            className="app-icon"
            onClick={() => handleOpenApp("WhatsApp", "/whatsapp")}
          >
            <img src={whatsappIcon} alt="WhatsApp" />
            <p>WhatsApp</p>
          </div>

          <div
            className="app-icon"
            onClick={() => handleOpenApp("Games", "/games")}
          >
            <img src={gamesIcon} alt="Games" />
            <p>Games</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apps;
