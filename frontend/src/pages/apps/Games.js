import { useState } from "react";
import "../../styles/appScreens.css";
function Games() {
  const [score, setScore] = useState(0);

  return (
    <div className="app-screen">
      <h2>🎮 Mini Game</h2>

      <p>Score: {score}</p>

      <button onClick={() => setScore(score + 1)}>Tap Me 🚀</button>
    </div>
  );
}

export default Games;
