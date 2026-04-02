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

function AppWrapper() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ LOGIN
  const handleLogin = (userData) => {
    console.log("LOGGED IN:", userData);
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
      {/* 🏠 LANDING PAGE */}
      <Route path="/" element={<Landing />} />

      {/* 🔐 LOGIN */}
      <Route path="/login" element={<Auth onLogin={handleLogin} />} />

      {/* 📊 DASHBOARD (PROTECTED) */}
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

      {/* 🔁 FALLBACK (ANY UNKNOWN ROUTE → LANDING) */}
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
