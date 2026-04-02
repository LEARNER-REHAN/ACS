import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

// ✅ App pages
import Instagram from "./pages/apps/Instagram";
import YouTube from "./pages/apps/YouTube";
import WhatsApp from "./pages/apps/WhatsApp";
import Games from "./pages/apps/Games";

function AppWrapper() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ LOGIN
  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/dashboard");
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <Routes>
      {/* 🏠 Landing */}
      <Route path="/" element={<Landing />} />

      {/* 🔐 Login */}
      <Route path="/login" element={<Auth onLogin={handleLogin} />} />

      {/* 📊 Dashboard (Protected) */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 📱 Apps */}
      <Route path="/instagram" element={<Instagram />} />
      <Route path="/youtube" element={<YouTube />} />
      <Route path="/whatsapp" element={<WhatsApp />} />
      <Route path="/games" element={<Games />} />

      {/* 🔁 Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
